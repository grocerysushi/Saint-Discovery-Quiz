# Saint Discovery Quiz

A web application that helps users discover which Catholic Saint they most identify with through a thoughtful personality quiz.

## Features

- 12 carefully crafted personality questions
- Matches users with one of 45+ saints based on their responses
- Gender-based matching (users are matched with saints of the same gender)
- Personalized explanations for why each saint was matched
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

2. **Run the Application**
   ```bash
   npm start
   ```

3. **Open in Browser**

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
│   └── index.js        # Express server (serves static files)
├── .env.example        # Template for environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## How It Works

1. User answers 12 personality questions
2. Each answer maps to personality traits (e.g., "intellectual", "compassion", "courage")
3. User selects their gender (Male/Female)
4. The app matches the user with a saint of the same gender based on trait compatibility
5. Results display the matched saint with details and a personalized explanation

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
    "status": "ok"
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

## License

This project is provided for educational and spiritual purposes.
