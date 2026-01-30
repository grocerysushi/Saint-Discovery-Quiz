# Saint Discovery Quiz

A beautiful web application that helps users discover which Catholic Saint they most identify with through a thoughtful personality quiz.

## Features

- 12 carefully crafted personality questions
- Matches users with one of 45+ saints based on their responses
- Personalized explanations for why each saint was matched
- Email delivery of results with beautiful formatting
- Supabase database storage for quiz results
- Optional newsletter signup
- Responsive, reverent design
- Privacy-focused with secure data handling

## Prerequisites

- Node.js 16 or higher
- A Supabase account (free tier works)
- An email service (Gmail with App Password, SendGrid, or other SMTP provider)

## Quick Start

1. **Clone and Install Dependencies**
   ```bash
   cd saintquiz
   npm install
   ```

2. **Configure Environment Variables**

   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

3. **Set Up Supabase Database**

   Follow the Supabase Setup section below.

4. **Configure Email Service**

   Follow the Email Setup section below.

5. **Run the Application**
   ```bash
   npm start
   ```

6. **Open in Browser**

   Navigate to `http://localhost:3000`

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details and wait for setup to complete

### 2. Create the Quiz Results Table

Go to the SQL Editor in your Supabase dashboard and run:

```sql
-- Create the quiz_results table
CREATE TABLE quiz_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
    matched_saint TEXT NOT NULL,
    newsletter_signup BOOLEAN DEFAULT false,
    quiz_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_quiz_results_email ON quiz_results(email);

-- Create an index on quiz_date for analytics
CREATE INDEX idx_quiz_results_date ON quiz_results(quiz_date);
```

### 3. Configure Row Level Security (RLS)

Run these SQL commands to set up security policies:

```sql
-- Enable RLS on the table
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow inserts from authenticated and anonymous users (via API)
CREATE POLICY "Allow anonymous inserts" ON quiz_results
    FOR INSERT
    WITH CHECK (true);

-- Restrict read access to authenticated users only (for admin access)
CREATE POLICY "Allow authenticated read" ON quiz_results
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- If you want to allow the service role to read all data (for admin dashboards):
CREATE POLICY "Allow service role full access" ON quiz_results
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');
```

### 4. Get Your API Credentials

1. Go to Project Settings > API
2. Copy the **Project URL** and **anon public** key
3. Add these to your `.env` file:
   ```
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

## Email Setup

### Option 1: Gmail with App Password (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account > Security > 2-Step Verification
   - Scroll to "App passwords"
   - Select "Mail" and your device
   - Copy the 16-character password
3. **Configure `.env`**:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   EMAIL_FROM=Saint Quiz <your-email@gmail.com>
   ```

### Option 2: SendGrid

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Create an API key with Mail Send permissions
3. Configure `.env`:
   ```
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   EMAIL_FROM=Saint Quiz <verified-sender@yourdomain.com>
   ```

### Option 3: Other SMTP Providers

Use your provider's SMTP settings:
- **Mailgun**: `smtp.mailgun.org`
- **Amazon SES**: `email-smtp.region.amazonaws.com`
- **Outlook/Office 365**: `smtp.office365.com`

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes* | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes* | Your Supabase anonymous key |
| `EMAIL_HOST` | Yes** | SMTP server hostname |
| `EMAIL_PORT` | No | SMTP port (default: 587) |
| `EMAIL_SECURE` | No | Use TLS (default: false) |
| `EMAIL_USER` | Yes** | SMTP username |
| `EMAIL_PASS` | Yes** | SMTP password/API key |
| `EMAIL_FROM` | No | From address for emails |
| `PORT` | No | Server port (default: 3000) |

*Required for database storage
**Required for email functionality

The application will run without these configured, but the respective features will be disabled.

## Project Structure

```
saintquiz/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # All styling
│   ├── quiz.js         # Quiz logic and interactions
│   └── saints-data.js  # Saint database with traits
├── server/
│   └── index.js        # Express server with API endpoints
├── .env                # Environment variables (create from .env.example)
├── .env.example        # Template for environment variables
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## API Endpoints

### POST /api/submit-quiz
Submit quiz results and send email.

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "gender": "Male",
    "newsletterSignup": true,
    "matchedSaint": "St. Francis of Assisi",
    "saintDetails": {
        "feastDay": "October 4",
        "knownFor": "...",
        "patronOf": "...",
        "dates": "1181-1226",
        "origin": "Italy"
    },
    "matchExplanation": "..."
}
```

**Response:**
```json
{
    "success": true,
    "dbSaved": true,
    "emailSent": true,
    "message": "Your results have been saved and emailed to you!"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
    "status": "ok",
    "supabaseConfigured": true,
    "emailConfigured": true
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
    traits: ["trait1", "trait2", "trait3", "trait4", "trait5"]
}
```

### Modifying Quiz Questions

Edit `public/quiz.js` to modify questions or add new ones. Each question should have:
- `id`: Unique identifier
- `question`: The question text
- `answers`: Array of 4 answer options, each with `text` and `traits`

### Customizing the Email Template

Edit the `generateEmailHtml` function in `server/index.js` to modify the email design.

## Troubleshooting

### Email not sending
- Verify your SMTP credentials
- For Gmail, ensure you're using an App Password
- Check the server console for error messages
- Verify the "from" address is authorized

### Database not saving
- Verify Supabase credentials in `.env`
- Check RLS policies allow inserts
- Look for errors in the server console
- Verify the table schema matches the expected format

### Quiz not matching correctly
- Ensure `saintsDatabase` has the `traits` array for each saint
- Verify questions have the correct trait mappings

## Security Considerations

- API keys are kept server-side, never exposed to the frontend
- Row Level Security restricts database access appropriately
- Email credentials are stored securely in environment variables
- User data is only collected with consent
- Newsletter signup is opt-in (unchecked by default)

## License

This project is provided for educational and spiritual purposes.

## Credits

Saint data sourced from Catholic_Saints_Comprehensive.xlsx
