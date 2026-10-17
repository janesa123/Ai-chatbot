# Jeni AI

Jeni AI is a responsive demo chatbot experience built with React, TypeScript, Vite, and Tailwind CSS. It includes local chat responses, code and creative tools, voice input, attachment handling, saved conversations, export, and sharing.

## Run locally

Requirements: Node.js 22 and pnpm.

```bash
pnpm install
pnpm dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Demo behavior

- Chat responses, translations, activity statistics, web search, and image prompts are demo data.
- Web search requires a search provider connected through a secure backend.
- Image Generator creates production-ready prompts; generating images requires an image-generation API.
- Voice input uses the browser Web Speech API where supported.
- Saved chats are stored in browser `localStorage`.
- No API keys are required or included.

## Production integration

Replace `getDemoResponse` in `src/App.tsx` with a request to your secured backend. Keep provider credentials on the server, validate all uploaded content, and add backend persistence if conversations should sync between devices.
