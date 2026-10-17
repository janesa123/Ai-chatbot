# 🤖 Jeni AI --- AI Chatbot Web Interface

**Jeni AI** is a dark-themed chatbot web interface built with HTML, CSS,
and vanilla JavaScript. It features a purple-blue visual theme, a robot
mascot, chat-style messages, tool panels, and saved conversations.

> **Important:** This project currently runs as a frontend/demo
> application. The code includes demo responses for several tools. A
> real AI model, live web search, live translation, and actual image
> generation are not connected unless you configure the appropriate
> backend/API integration.

## 🖼️ Preview

### Jeni AI robot mascot

![Jeni AI robot mascot]
<img width="1883" height="860" alt="Screenshot 2026-10-17 221029" src="https://github.com/user-attachments/assets/9d2f8b59-f5c9-4e2d-9d1a-7ab6719822f3" />


### Dashboard / welcome screen

![Jeni AI dashboard]
<img width="1883" height="860" alt="Screenshot 2026-10-17 221029" src="https://github.com/user-attachments/assets/9d2f8b59-f5c9-4e2d-9d1a-7ab6719822f3" />

### Chat conversation

![Jeni AI chat conversation]
<img width="1917" height="958" alt="Screenshot 2026-10-17 221127" src="https://github.com/user-attachments/assets/1592a8ba-206f-4da6-a744-f6bd7bf0b6b5" />

### Chat and response example

![Jeni AI response example]
<img width="1917" height="958" alt="Screenshot 2026-10-17 221127" src="https://github.com/user-attachments/assets/1592a8ba-206f-4da6-a744-f6bd7bf0b6b5" />

### Saved Chats

![Jeni AI Saved Chats]
<img width="1913" height="882" alt="Screenshot 2026-10-17 221200" src="https://github.com/user-attachments/assets/d234b945-f5f3-444b-b6e9-100849929036" />


> The image links above are relative paths. Keep the image files in the
> same repository (or update the paths) for them to display on GitHub.

## ✨ Features and current scope

The interface includes navigation and controls for the following areas.
Availability of a button or screen does not mean an external AI service
is connected.

-   **Chat interface** --- displays user and assistant-style messages
    using local demo responses.
-   **Code Assistant** --- provides demo coding explanations and
    examples.
-   **Idea Generator** --- provides sample idea-generation responses.
-   **Translation** --- interface/demo responses; a live translation API
    is not connected.
-   **Image Generator** --- creates a detailed image prompt; actual
    image rendering requires an image-generation service.
-   **Voice Assistant** --- microphone input uses browser
    speech-recognition support where available.
-   **Web Search** --- interface/demo mode; live search requires a
    search API or backend.
-   **Saved Chats** --- saves, reopens, and deletes saved conversations
    using browser `localStorage`.
-   **File Upload** --- provides a file attachment control; file-content
    analysis depends on implementation and any connected backend.
-   **Download / Export** --- exports chat text where supported by the
    current implementation.
-   **Activity panel** --- shows sample/demo statistics, not verified
    live analytics.

## 🛠️ Technologies

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   Browser `localStorage` for saved-chat data
-   Browser speech-recognition API where supported
-   Font Awesome icons (if loaded by the project)

## 📁 Project structure

The main project files are expected to be arranged like this. Adjust
names if your local folder differs.

``` text
Jeni-AI/
├── index.html
├── style.css
├── script.js
├── knowledge.js
├── robot.png
├── chatbot1.png
├── chatbot2.png
├── chatbot3.png
├── chatbot4.png
└── README.md
```

-   `index.html` --- page layout and interface structure.
-   `style.css` --- dark theme, layout, and responsive styling.
-   `script.js` --- navigation, chat UI interactions, saved chats, and
    demo features.
-   `knowledge.js` --- local knowledge/demo response content.
-   `robot.png` --- Jeni AI robot mascot.
-   `chatbot1.png`--`chatbot4.png` --- reference screenshots used in
    this README.

## 🚀 Run locally with VS Code

### Requirements

-   [Visual Studio Code](https://code.visualstudio.com/)
-   A modern browser such as Chrome or Edge
-   The **Live Server** extension for VS Code

### Steps

1.  Download or clone the repository:

    ``` bash
    git clone https://github.com/janesa123/Ai-chatbot.git
    ```

2.  Open the `Ai-chatbot` folder in VS Code (**File → Open Folder**).

3.  Install the **Live Server** extension if it is not already
    installed.

4.  Open `index.html`.

5.  Right-click inside the editor and select **Open with Live Server**,
    or click **Go Live** in the VS Code status bar.

6.  Open the local URL Live Server shows, usually
    `http://127.0.0.1:5500/`.

If the project folder or port differs, use the exact local URL shown by
Live Server.

## ⚙️ Backend and API configuration

This version is documented as **HTML, CSS, and JavaScript only**. Do not
place private API keys in frontend JavaScript.

To connect real AI or external services in the future:

1.  Create a backend service to make authenticated API requests.
2.  Store API keys in backend environment variables, never in committed
    frontend files.
3.  Connect the frontend to your backend endpoints.
4.  Add loading, error, rate-limit, and offline handling.
5.  Update this README only after each integration has been tested.

## 🧪 Testing checklist

-   [ ] `index.html` opens through Live Server.
-   [ ] CSS and robot image load without broken paths.
-   [ ] Chat input accepts text and displays a response.
-   [ ] New Chat starts a fresh conversation.
-   [ ] Code Assistant and Idea Generator demo flows respond.
-   [ ] Translation and Image Generator clearly indicate demo
    limitations.
-   [ ] Saved chats can be opened and deleted.
-   [ ] Voice input is handled gracefully when the browser does not
    support it.
-   [ ] File upload and export controls behave as expected.
-   [ ] The interface is usable at desktop and mobile widths.
-   [ ] No secret keys or credentials are committed to GitHub.

## 🔭 Future improvements

-   Connect a real AI model through a secure backend.
-   Integrate live web search, translation, and image-generation
    services.
-   Improve file parsing and document question answering.
-   Add more robust accessibility and mobile testing.
-   Add automated tests and error handling.
-   Replace demo activity statistics with real usage metrics if
    analytics are implemented.

## 👩‍💻 Author

**Jeni J**\
**Course:** B.Tech Artificial Intelligence and Data Science

-   **GitHub profile:** [janesa123](https://github.com/janesa123)
-   **Project repository:**
    [Ai-chatbot](https://github.com/janesa123/Ai-chatbot)

## 📄 License

No license has been specified yet. Add a license file and update this
section if you intend to publish or reuse the project under a particular
license.

------------------------------------------------------------------------

*Built as a frontend chatbot project using HTML, CSS, and JavaScript.*
