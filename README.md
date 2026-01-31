# Saint Discovery Quiz

A web application that helps users discover which Catholic Saint they most identify with through a thoughtful personality quiz. Features AI-powered matching and a comprehensive directory of 137 saints.

**Live Site:** [saintdiscoveryquiz.com](https://saintdiscoveryquiz.com)

## Features

### Quiz Experience
- 12 carefully crafted personality questions
- Matches users with one of **137 Catholic saints** based on their responses
- Gender-based matching (users are matched with saints of the same gender)
- Personalized, AI-generated explanations for why each saint was matched
- Intelligent trait-based algorithm with rarity weighting
- Responsive, reverent design
- No data collection - results are displayed instantly

### AI Integration
- **GPT-4o mini** provides personalized saint matches with unique explanations
- Fallback protection - if AI is unavailable, the trait-based algorithm provides the match
- 10-second timeout to prevent endless loading

### Saint Directory Pages
- **[All Saints](/all-saints.html)** - Complete searchable directory of 137 saints
- **[Saints by Virtue](/saints-by-virtue.html)** - Saints organized by 11 virtue categories
- **[Saints by Century](/saints-by-century.html)** - Historical timeline from biblical era to modern saints

### SEO & Performance
- Comprehensive structured data (JSON-LD schemas)
- Open Graph and Twitter Card meta tags
- Gzip compression for faster loading
- Static asset caching headers
- PWA support with web manifest
- Mobile-optimized responsive design

## Saints Database

The quiz includes **137 Catholic saints** spanning 2000 years of Church history:

| Category | Count |
|----------|-------|
| Male Saints | 95 |
| Female Saints | 42 |
| **Total** | **137** |

**Includes:**
- Biblical figures (Apostles, Evangelists, Holy Family)
- Early Church martyrs and Church Fathers
- Medieval mystics and scholars
- Counter-Reformation founders
- Modern saints (20th-21st century)
- Saints from every continent

## Prerequisites

- Node.js 16 or higher
- OpenAI API key (for AI-enhanced matching)

## Quick Start

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/grocerysushi/Saint-Discovery-Quiz.git
   cd Saint-Discovery-Quiz
   npm install
   ```

2. **Configure OpenAI API Key**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Add your OpenAI API key to `.env`:
   ```env
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   > **Note**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

3. **Run the Application**
   ```bash
   npm start
   ```

4. **Open in Browser**

   Navigate to `http://localhost:3000`

## Project Structure

```
Saint-Discovery-Quiz/
├── public/
│   ├── index.html          # Main quiz page
│   ├── all-saints.html     # Complete saints directory
│   ├── saints-by-virtue.html   # Saints organized by virtue
│   ├── saints-by-century.html  # Saints timeline by era
│   ├── styles.css          # All styling
│   ├── quiz.js             # Quiz logic and interactions
│   ├── saints-data.js      # Saint database (137 saints)
│   ├── manifest.json       # PWA manifest
│   ├── sitemap.xml         # XML sitemap for SEO
│   ├── robots.txt          # Crawler directives
│   └── favicon.png         # Site icon
├── server/
│   ├── index.js            # Express server with caching & compression
│   └── ai-matcher.js       # GPT-4o mini integration
├── .env                    # Environment variables (API keys)
├── .env.example            # Template for environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## How It Works

1. **User answers 12 personality questions** - Each answer maps to personality traits (e.g., "intellectual", "compassion", "courage")
2. **User selects their gender** (Male/Female)
3. **Trait-based algorithm calculates top candidates** - Uses trait rarity weighting and category matching to find the top 5 saints
4. **AI analyzes personality** - GPT-4o mini receives user answers and top candidates, then selects the best match
5. **Personalized results** - AI generates a unique explanation of why this saint matches the user's spiritual journey
6. **Fallback protection** - If AI is unavailable, the original trait-based algorithm provides the match

## Virtue Categories

Saints are matched based on these trait categories:

| Category | Traits |
|----------|--------|
| Intellectual | intellectual, teaching, writing, wisdom, philosophy |
| Contemplative | contemplation, mysticism, prayer, meditation, devotion |
| Service | service, charity, compassion, healing, generosity |
| Leadership | leadership, reform, activism, conviction, discipline |
| Missionary | missionary, adventure, cross-cultural, preaching |
| Creative | arts, music, poetry, nature, animals |
| Humble | humility, simplicity, obedience, poverty, patience |
| Family | family, motherhood, nurturing, protection, children |
| Transformative | transformation, forgiveness, hope, perseverance |
| Courageous | courage, faith, strength, sacrifice, endurance |
| Warrior | warrior, military, protection, justice |
| Joyful | joy, innovation, youth, education, love |

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
    "status": "ok"
}
```

### POST /api/ai-match
AI-enhanced saint matching endpoint. Receives user answers and top candidate saints, returns AI analysis.

**Request Body:**
```json
{
    "userAnswers": [...],
    "topCandidates": [...],
    "userGender": "Male" | "Female"
}
```

**Response:**
```json
{
    "success": true,
    "saintName": "St. Thomas Aquinas",
    "explanation": "Your thoughtful, intellectual approach...",
    "inspiration": "Let St. Thomas inspire you..."
}
```

## Customization

### Adding More Saints

Edit `public/saints-data.js` to add more saints:

```javascript
{
    name: "St. New Saint",
    feastDay: "January 1",
    knownFor: "Description of what they're known for",
    patronOf: "List of patronages",
    dates: "1900-2000",
    origin: "Country",
    gender: "Male",  // or "Female"
    traits: ["trait1", "trait2", "trait3", "trait4", "trait5"],
    quotes: ["Quote 1", "Quote 2"]
}
```

### Modifying Quiz Questions

Edit `public/quiz.js` to modify questions or add new ones. Each question should have:
- `id`: Unique identifier
- `question`: The question text
- `answers`: Array of 4 answer options, each with `text` and `traits`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3000) |
| `OPENAI_API_KEY` | Yes | OpenAI API key for GPT-4o mini integration |

**Security Note**: Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it.

## SEO Features

- **Structured Data**: WebSite, WebApplication, Quiz, Organization, FAQ, BreadcrumbList schemas
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Sitemap**: XML sitemap with all pages
- **Robots.txt**: Configured for optimal crawling
- **Performance**: Gzip compression, cache headers, resource preloading

## License

This project is provided for educational and spiritual purposes.
