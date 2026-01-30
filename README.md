# Saint Discovery Quiz

A web application that helps users discover which Catholic Saint they most identify with through a thoughtful personality quiz.

## Features

- 🤖 **AI-Enhanced Matching** - Uses GPT-4o mini to provide personalized saint matches with unique explanations
- 12 carefully crafted personality questions
- Matches users with one of 45+ saints based on their responses
- Gender-based matching (users are matched with saints of the same gender)
- Personalized, AI-generated explanations for why each saint was matched
- Intelligent trait-based algorithm with rarity weighting
- Responsive, reverent design
- No data collection - results are displayed instantly

## Prerequisites

- Node.js 16 or higher

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
│   ├── index.html      # Main HTML file
│   ├── styles.css      # All styling
│   ├── quiz.js         # Quiz logic and interactions
│   └── saints-data.js  # Saint database with traits
├── server/
│   ├── index.js        # Express server with API endpoints
│   └── ai-matcher.js   # GPT-4o mini integration for AI matching
├── .env                # Environment variables (API keys)
├── .env.example        # Template for environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## How It Works

1. **User answers 12 personality questions** - Each answer maps to personality traits (e.g., "intellectual", "compassion", "courage")
2. **User selects their gender** (Male/Female)
3. **Trait-based algorithm calculates top candidates** - Uses trait rarity weighting and category matching to find the top 5 saints
4. **AI analyzes personality** - GPT-4o mini receives user answers and top candidates, then selects the best match
5. **Personalized results** - AI generates a unique explanation of why this saint matches the user's spiritual journey
6. **Fallback protection** - If AI is unavailable, the original trait-based algorithm provides the match

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
    traits: ["trait1", "trait2", "trait3", "trait4", "trait5"]
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

## License

This project is provided for educational and spiritual purposes.
