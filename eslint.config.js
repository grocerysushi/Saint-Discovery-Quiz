const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        files: ['server/**/*.js', 'scripts/**/*.js', 'tests/**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                Buffer: 'readonly',
                URL: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-undef': 'error',
            'no-constant-condition': 'warn',
            'no-debugger': 'warn',
            'no-duplicate-case': 'error',
            'no-empty': 'warn',
            'no-redeclare': 'error',
            'eqeqeq': ['warn', 'smart'],
        },
    },
    {
        ignores: ['public/**', 'node_modules/**', '**/*.min.js'],
    },
];
