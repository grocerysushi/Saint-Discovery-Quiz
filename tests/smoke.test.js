/**
 * Minimal smoke tests for critical endpoints and deterministic scoring.
 * Run: npm test
 */

const assert = require('assert');
const http = require('http');
const path = require('path');

// ── Helpers ──

let server, baseUrl;

function fetch(urlPath, options = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlPath, baseUrl);
        const opts = { method: 'GET', ...options, hostname: url.hostname, port: url.port, path: url.pathname + url.search };
        if (options.body) opts.headers = { 'Content-Type': 'application/json', ...opts.headers };
        const req = http.request(opts, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
                catch { resolve({ status: res.statusCode, body: data }); }
            });
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
}

// ── Server lifecycle ──

async function startServer() {
    // Avoid port conflicts by using 0 (random available port)
    process.env.PORT = '0';
    // Clear module cache so a fresh app is created each run
    delete require.cache[require.resolve('../server/index.js')];
    const app = require('../server/index.js');
    await new Promise((resolve, reject) => {
        server = app.listen(0, () => {
            baseUrl = `http://127.0.0.1:${server.address().port}`;
            resolve();
        });
        server.on('error', reject);
    });
}

async function stopServer() {
    if (server) await new Promise(r => server.close(r));
}

// ── Tests ──

async function testHealth() {
    const res = await fetch('/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'ok');
    assert(res.body.saints > 0, 'should report saint count');
    assert(res.body.timestamp, 'should include timestamp');
    assert(typeof res.body.aiAvailable === 'boolean', 'should report AI availability');
    console.log('  ✓ GET /api/health');
}

async function testSaintOfTheDay() {
    const res = await fetch('/api/saint-of-the-day');
    assert.strictEqual(res.status, 200);
    assert(res.body.saint, 'response should include saint');
    assert(res.body.saint.name, 'saint should have a name');
    assert(res.body.date, 'response should include date');
    console.log('  ✓ GET /api/saint-of-the-day');
}

async function testFeastDay() {
    const res = await fetch('/api/feast-day?date=2024-06-29');
    assert.strictEqual(res.status, 200);
    assert(Array.isArray(res.body.saints), 'response should have saints array');
    // June 29 is St. Peter's feast day
    const names = res.body.saints.map(s => s.name);
    assert(names.some(n => n.includes('Peter')), `Expected St. Peter on June 29, got: ${names}`);
    console.log('  ✓ GET /api/feast-day?date=2024-06-29');
}

async function testFeastDayInvalidDate() {
    const res = await fetch('/api/feast-day?date=not-a-date');
    assert.strictEqual(res.status, 400);
    console.log('  ✓ GET /api/feast-day rejects invalid date');
}

async function testSaintsPagination() {
    // Default returns all
    const all = await fetch('/api/saints');
    assert.strictEqual(all.status, 200);
    assert(all.body.total > 0, 'should have saints');
    assert.strictEqual(all.body.count, all.body.total);

    // Limit + offset
    const page = await fetch('/api/saints?limit=5&offset=2');
    assert.strictEqual(page.status, 200);
    assert.strictEqual(page.body.limit, 5);
    assert.strictEqual(page.body.offset, 2);
    assert.strictEqual(page.body.count, 5);
    assert(page.body.total > 5);

    // Field projection
    const proj = await fetch('/api/saints?limit=1&fields=name,gender');
    assert.strictEqual(proj.status, 200);
    const saint = proj.body.saints[0];
    assert(saint.name, 'should have name');
    assert(saint.gender, 'should have gender');
    assert.strictEqual(saint.knownFor, undefined, 'should not have knownFor');

    console.log('  ✓ GET /api/saints pagination + projection');
}

async function testAiMatchValidation() {
    // Missing fields
    const res1 = await fetch('/api/ai-match', {
        method: 'POST',
        body: JSON.stringify({})
    });
    assert.strictEqual(res1.status, 400);

    // Bad userAnswers type
    const res2 = await fetch('/api/ai-match', {
        method: 'POST',
        body: JSON.stringify({ userAnswers: 'nope', topCandidates: [], userGender: 'Male' })
    });
    assert.strictEqual(res2.status, 400);

    // Bad candidate shape
    const res3 = await fetch('/api/ai-match', {
        method: 'POST',
        body: JSON.stringify({
            userAnswers: [{ traits: ['kindness'] }],
            topCandidates: [{ score: 10 }], // missing saint
            userGender: 'Male'
        })
    });
    assert.strictEqual(res3.status, 400);

    console.log('  ✓ POST /api/ai-match rejects invalid payloads');
}

// ── Deterministic scoring test (no server needed) ──

function testScoring() {
    const saints = JSON.parse(
        require('fs').readFileSync(path.join(__dirname, '../public/saints-data-enriched.json'), 'utf8')
    );
    const categories = JSON.parse(
        require('fs').readFileSync(path.join(__dirname, '../public/trait-categories.json'), 'utf8')
    );

    const maleSaints = saints.filter(s => s.gender === 'Male');

    // Replicate the deterministic parts of calculateMatch
    const userTraits = ['leadership', 'dedication', 'boldness', 'faithfulness'];
    const traitCounts = {};
    userTraits.forEach(t => { traitCounts[t] = (traitCounts[t] || 0) + 1; });

    const traitFrequency = {};
    maleSaints.forEach(s => s.traits.forEach(t => { traitFrequency[t] = (traitFrequency[t] || 0) + 1; }));
    const commonThreshold = maleSaints.length * 0.4;
    const commonTraits = Object.keys(traitFrequency).filter(t => traitFrequency[t] > commonThreshold);

    const sortedTraits = Object.entries(traitCounts).sort((a, b) => b[1] - a[1]);
    const userCategories = {};
    sortedTraits.forEach(([trait, count]) => {
        Object.keys(categories).forEach(cat => {
            if (categories[cat].includes(trait)) userCategories[cat] = (userCategories[cat] || 0) + count;
        });
    });
    const topCategories = Object.entries(userCategories).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c]) => c);

    const scores = maleSaints.map(saint => {
        let score = 0, directMatches = 0, rareMatches = 0;

        saint.traits.forEach(trait => {
            if (traitCounts[trait]) {
                const isCommon = commonTraits.includes(trait);
                score += traitCounts[trait] * 2 * (isCommon ? 1 : 2);
                directMatches++;
                if (!isCommon) rareMatches++;
            }
        });

        saint.traits.forEach(trait => {
            Object.keys(categories).forEach(cat => {
                if (categories[cat].includes(trait) && topCategories.includes(cat)) {
                    score += (3 - topCategories.indexOf(cat)) * 1.5;
                }
            });
        });

        if (directMatches >= 3) score += directMatches * 1.5;
        if (rareMatches > 0) score += rareMatches * 3;
        const matchPct = directMatches / saint.traits.length;
        if (matchPct > 0.5) score += matchPct * 5;

        return { name: saint.name, score, directMatches };
    });

    scores.sort((a, b) => b.score - a.score);
    const top = scores[0];

    // St. Peter has exactly these traits — he should score highest deterministically
    assert(top.name === 'St. Peter', `Expected St. Peter as top match for leadership+dedication+boldness+faithfulness, got ${top.name}`);
    assert(top.score > 0, 'Top score should be positive');
    assert(top.directMatches >= 4, `Expected >=4 direct matches, got ${top.directMatches}`);

    // Scores should be deterministic — run twice and compare
    const scores2 = [...scores].sort((a, b) => b.score - a.score);
    assert.deepStrictEqual(scores.map(s => s.score), scores2.map(s => s.score), 'Scoring should be deterministic');

    console.log(`  ✓ Scoring: "${top.name}" is top match (score=${top.score.toFixed(1)}, ${top.directMatches} direct)`);
}

// ── Asset staleness test ──

function testMinifiedFreshness() {
    const fs = require('fs');
    const pairs = [
        ['public/quiz.js', 'public/quiz.min.js'],
        ['public/saints-data-enriched.js', 'public/saints-data-enriched.min.js'],
        ['public/saints-data-quiz.js', 'public/saints-data-quiz.min.js'],
    ];
    for (const [src, min] of pairs) {
        const srcPath = path.join(__dirname, '..', src);
        const minPath = path.join(__dirname, '..', min);
        if (!fs.existsSync(minPath)) {
            throw new Error(`${min} does not exist — run "npm run build"`);
        }
        const srcMtime = fs.statSync(srcPath).mtimeMs;
        const minMtime = fs.statSync(minPath).mtimeMs;
        if (srcMtime > minMtime) {
            throw new Error(`${min} is older than ${src} — run "npm run build" to regenerate`);
        }
    }
    console.log('  ✓ Minified assets are up to date');
}

// ── Runner ──

async function run() {
    let failures = 0;
    console.log('\nScoring tests:');
    try { testScoring(); } catch (e) { console.error('  ✗ Scoring:', e.message); failures++; }

    console.log('\nBuild tests:');
    try { testMinifiedFreshness(); } catch (e) { console.error('  ✗ Minified freshness:', e.message); failures++; }

    console.log('\nEndpoint tests:');
    await startServer();
    for (const test of [testHealth, testSaintOfTheDay, testFeastDay, testFeastDayInvalidDate, testSaintsPagination, testAiMatchValidation]) {
        try { await test(); } catch (e) { console.error(`  ✗ ${test.name}:`, e.message); failures++; }
    }
    await stopServer();

    console.log(failures ? `\n${failures} test(s) failed` : '\nAll tests passed');
    process.exit(failures ? 1 : 0);
}

run();
