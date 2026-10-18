# ✨ Jeni AI — AI Chatbot Redesign

> **A clean, responsive chatbot interface for chatting, exploring AI tools, using voice input, and managing conversations.**

Jeni AI is a front-end chatbot demo built with React and TypeScript. It features a modern chat workspace with AI-tool shortcuts, browser-based voice input, file attachments, saved chats, and conversation export and sharing. Responses are currently generated locally using demo logic rather than a connected AI service.

---

## 🌐 Project Links

| Resource | Link |
| --- | --- |
| 👩‍💻 GitHub Profile | [janesa123](https://github.com/janesa123) |
| 📦 Project Repository | Add the repository URL after uploading this project |
| 🚀 Live Demo | Add a deployment URL if available |

---

## 🎯 Project Overview

Chat interfaces can become difficult to navigate when common actions—such as starting a chat, using voice input, finding tools, and saving conversations—are scattered across the UI.

Jeni AI brings these actions together in a single responsive workspace with clear navigation and a simple message composer.

### Goals

- 💬 Provide a straightforward chat interface.
- 🧰 Make common creative and productivity tools easy to access.
- 🎙️ Support browser-based voice input where available.
- 📎 Allow users to select supported files as attachments.
- 🗂️ Let users save and reopen conversations in the same browser.
- 📤 Support exporting and sharing conversation text.

---

## ✨ Features

### 💬 Chat Interface
- Message composer with send controls
- User and assistant message styling
- Typing indicator and message timestamps
- Suggested prompts to help users get started
- Responsive layout with sidebar navigation

### 🧰 AI Tools
The interface includes shortcuts for:

- **Code Assistant** — example code-writing and explanation responses
- **Image Generator** — prepares a detailed image-generation prompt
- **Idea Generator** — provides brainstorming examples
- **Translation** — demonstrates a sample translation

> These are demo experiences. They do not call live AI, image-generation, or translation services.

### 🎙️ Voice Assistant
- Uses the browser's Web Speech API where supported
- Converts recognized speech into text in the message field
- Displays feedback if voice input is unavailable or microphone access fails

Voice input is browser-dependent and currently configured for English (`en-US`). It does not provide a complete spoken-response/text-to-speech system.

### 🌐 Web Search View
- Dedicated Web Search section in the navigation
- Demo-mode messaging for search requests

Live web search is not connected. A search provider and secure backend are required for real-time results and citations.

### 📎 File Attachments
- File picker supports `.txt`, `.md`, `.pdf`, PNG, JPEG, and WebP files
- Rejects selected files larger than 10 MB
- Shows the selected filename in the composer

The current demo does not upload files to a backend or process their contents with an AI model.

### 🗂️ Saved Conversations
- Save the current conversation
- Reopen a saved chat
- Delete saved chats
- Store saved conversations in browser `localStorage`

Saved chats remain in the same browser profile unless its local storage is cleared. They do not sync between devices.

### 📤 Export and Share
- Export conversation text as a `.txt` file
- Share using the browser's Web Share API when available
- Fall back to copying conversation text to the clipboard when supported

### 📊 Demo Activity Panel
The interface includes example activity statistics. These figures are static demo values and should not be interpreted as live usage analytics or measured AI performance.

---

## 🖼️ Screenshots

Add screenshots of your running application to a `screenshots/` folder, then update the image paths below.

### Main Chat Interface

![Jeni AI main chat interface](./screenshots/main-chat.png)

### AI Tools

![Jeni AI tools](./screenshots/ai-tools.png)

### Voice Assistant

![Jeni AI voice assistant](./screenshots/voice-assistant.png)

### Saved Chats

![Jeni AI saved conversations](./screenshots/saved-chats.png)

---

## 🛠️ Technology Stack

| Category | Technology |
| --- | --- |
| UI framework | React 19 |
| Language | TypeScript |
| Build tool / dev server | Vite |
| Styling | CSS, Tailwind CSS 4 integration |
| Browser voice input | Web Speech API (`webkitSpeechRecognition`, where available) |
| Local persistence | Browser `localStorage` |
| File selection | HTML file input and browser APIs |
| Package manager | pnpm (lockfile included) |

---

## 📁 Project Structure

```text
Jeni-AI/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 22** (as specified by the project's existing README)
- **pnpm**

Check your versions:

```bash
node --version
pnpm --version
```

### 1. Get the project

If you have cloned your GitHub repository:

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Or extract the downloaded project ZIP and open a terminal in the extracted folder.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open the local URL printed in the terminal. Vite commonly uses:

```text
http://localhost:5173
```

The port may differ if the default port is already in use.

### 4. Build for production

```bash
pnpm build
```

### 5. Preview the production build

```bash
pnpm preview
```

---

## ⚙️ Demo Behavior and Configuration

No API keys are required to run the current demo.

The app's `getDemoResponse` function in `src/App.tsx` provides local example responses for selected prompt types. The following capabilities require additional integration for production use:

| Capability | Current status | Needed for production |
| --- | --- | --- |
| Chat responses | Local demo logic | AI model API through a secure backend |
| Live web search | Demo mode | Search provider and backend |
| Image generation | Prompt generation only | Image-generation service |
| Translation | Example response | Translation service or validated model |
| Voice input | Browser-dependent | Broader browser testing and fallback UX |
| File understanding | File selection only | Secure upload, parsing, and content processing |
| Saved chats | Browser `localStorage` | Backend/database if cross-device sync is needed |
| Activity statistics | Static sample figures | Real event tracking and analytics |

---

## 🔐 Privacy and Security Notes

- Keep API keys and provider credentials on a server; never expose secret keys in frontend code.
- Validate file type and content on the server before processing uploads.
- Explain clearly when voice recognition uses browser services.
- Avoid storing sensitive conversations unless necessary and clearly disclosed.
- Provide a way to delete saved conversations and explain that browser storage is local to that browser profile.
- Add authentication, authorization, rate limits, logging, and appropriate data-retention controls before a public production deployment.

---

## ⚠️ Current Limitations

- Responses are generated using demo logic and are not produced by a connected large language model.
- Web Search does not retrieve live web pages.
- The Image Generator creates prompts, not image files.
- Translation responses are examples and are not a substitute for verified translation services.
- Voice input depends on browser support and microphone permissions; the current recognition language is English.
- Attachments are selected in the UI but are not sent to an AI model or backend.
- Saved chats use `localStorage` and do not sync between browsers or devices.
- The activity figures shown in the UI are static examples.

---

## 🔮 Future Enhancements

- 🤖 Connect a language model through a secure backend.
- 🔎 Add live web search with reliable source citations.
- 🎨 Integrate an image-generation API.
- 🌍 Add broader language support and validated translations.
- 🗣️ Add text-to-speech and improve voice interaction accessibility.
- 📄 Parse supported attachments securely and summarize their content.
- ☁️ Add authenticated cloud sync for saved conversations.
- 📈 Replace sample statistics with real, privacy-conscious analytics.
- ♿ Expand keyboard navigation, screen-reader support, and accessibility testing.

---

## 🎥 Demo

Add a screen recording or deployed demo link here when available.

A useful walkthrough can show:
1. Starting a new chat and using a suggested prompt
2. Exploring AI Tools
3. Trying voice input in a supported browser
4. Selecting a supported attachment
5. Saving, reopening, exporting, and sharing a conversation
6. Explaining which features are demo-only and which require service integration

---

## 👩‍💻 Author

**Janessa**

- GitHub: [@janesa123](https://github.com/janesa123)

---

## 📄 License

No license file was included in the supplied project archive. Add a `LICENSE` file if you intend to publish the project with explicit reuse permissions.

---

> **Jeni AI** — a simple workspace for exploring chat, voice input, and AI-tool experiences.
