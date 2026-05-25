# Anubhav Portfolio

Premium single-page portfolio with a live AI-backed floating chatbot.

## Run Locally

```powershell
npm start
```

Open:

```text
http://localhost:5173
```

## Enable Ask Anubhav AI

Gemini is the default provider. The easiest setup is to copy `.env.example` to `.env`, then paste your Gemini API key:

```powershell
Copy-Item .env.example .env
notepad .env
npm start
```

You can also set values directly in PowerShell before starting the server:

```powershell
$env:AI_PROVIDER="gemini"
$env:GEMINI_API_KEY="your_gemini_api_key_here"
$env:AI_MODEL="gemini-2.5-flash"
npm start
```

The API key stays on the Node server and is never sent to the browser.

Get a Gemini API key from Google AI Studio:

```text
https://aistudio.google.com/app/apikey
```

## Optional OpenRouter Mode

```powershell
$env:AI_PROVIDER="openrouter"
$env:OPENROUTER_API_KEY="your_openrouter_api_key_here"
$env:AI_MODEL="deepseek/deepseek-chat-v3.1:free"
npm start
```

Free model availability can change, so update `AI_MODEL` if your provider changes the free model slug.

## Deploy With Live Chatbot On Vercel

GitHub Pages can host the static website, but it cannot run `server.js` or the Gemini API proxy. For the live chatbot, deploy this repo on Vercel.

1. Go to:

```text
https://vercel.com/new
```

2. Import this GitHub repo.

3. Add Environment Variables:

```text
GEMINI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-2.5-flash
```

4. Deploy.

The frontend calls `/api/chat`, and Vercel runs `api/chat.js` as a secure serverless function. The Gemini key stays server-side.

## Files

- `index.html` - portfolio markup and chatbot shell
- `styles.css` - cinematic dark UI, glassmorphism, responsive styling
- `script.js` - animations, counters, particles, chatbot client logic
- `server.js` - static file server and secure AI proxy
- `api/chat.js` - Vercel serverless Gemini chatbot endpoint
- `vercel.json` - Vercel deployment config
- `knowledge/anubhav-profile.md` - editable chatbot knowledge base
- `.env.example` - provider configuration examples

## Update Chatbot Knowledge

Edit:

```text
knowledge/anubhav-profile.md
```

Restart `npm start` after changing the file. The server reads this markdown file into the chatbot system context, so you can update experience, projects, achievements, education, and response rules without editing JavaScript.
