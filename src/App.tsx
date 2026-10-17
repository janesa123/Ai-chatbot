import { FormEvent, useEffect, useRef, useState } from "react"

type IconName = "plus" | "chat" | "sparkles" | "mic" | "globe" | "bookmark" | "download" | "clock" | "share" | "paperclip" | "send" | "code" | "image" | "bulb" | "languages" | "trash" | "activity" | "chevron" | "close"

type Message = {
  id: string
  role: "user" | "assistant"
  text: string
  time: string
}

type SavedChat = {
  id: string
  title: string
  date: string
  messages: Message[]
}

type View = "chat" | "tools" | "voice" | "search" | "saved"

const STORAGE_KEY = "jeni-ai-saved-chats"

const navItems: { id: View label: string icon: IconName }[] = [
  { id: "chat", label: "Chat", icon: "chat" },
  { id: "tools", label: "AI Tools", icon: "sparkles" },
  { id: "voice", label: "Voice Assistant", icon: "mic" },
  { id: "search", label: "Web Search", icon: "globe" },
  { id: "saved", label: "Saved Chats", icon: "bookmark" },
]

const suggestions: {
  title: string
  description: string
  prompt: string
  icon: IconName
  color: string
}[] = [
  {
    title: "Code Assistant",
    description: "Write, explain, and debug code",
    prompt:
      "Show me a clean JavaScript function that groups an array of objects by a key.",
    icon: "code",
    color: "violet",
  },
  {
    title: "Image Generator",
    description: "Turn your ideas into detailed prompts",
    prompt:
      "Create an image prompt for a futuristic city floating above the clouds.",
    icon: "image",
    color: "blue",
  },
  {
    title: "Idea Generator",
    description: "Brainstorm fresh creative ideas",
    prompt: "Give me five creative ideas for a sustainable mobile app.",
    icon: "bulb",
    color: "pink",
  },
  {
    title: "Translation",
    description: "Translate clearly across languages",
    prompt:
      'Translate "Welcome to Jeni AI, your creative assistant" into Spanish.',
    icon: "languages",
    color: "cyan",
  },
]

const activity = [
  ["Conversations", "37"],
  ["Avg. Response Time", "0.3s"],
  ["Code Snippets", "9"],
  ["Images Generated", "15"],
  ["Translations", "6"],
  ["Accuracy", "99%"],
  ["Daily Streak", "12 days"],
]

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  const paths: Record<IconName, React.ReactNode> = {
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    chat: (
      <>
        <path d="M20 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.2zM18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8zM6 13l.8 2.2L9 16l-2.2.8L6 19l-.8-2.2L3 16l2.2-.8z" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    bookmark: (
      <>
        <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="m8.2 10.8 7.6-4.5m-7.6 6.9 7.6 4.5" />
      </>
    ),
    paperclip: (
      <>
        <path d="m20.5 11.5-8.4 8.4a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 1 1-2.8-2.8l8.3-8.3" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 15-4-4L6 20" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 18h6m-5 3h4m3.5-7.5A7 7 0 1 0 6.5 14c1 1 1.5 2 1.5 4h8c0-2 .5-3 1.5-4.5z" />
      </>
    ),
    languages: (
      <>
        <path d="M4 5h8M8 3v2m3 0c-1 4-3.5 7-7 9m2-5c1 2 3 4 6 5m2-4h6l-3 11m-5 0 5-11 5 11" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" />
      </>
    ),
    activity: (
      <>
        <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />
      </>
    ),
    chevron: (
      <>
        <path d="m9 18 6-6-6-6" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  }

  return <svg {...common}>{paths[name]}</svg>
}

function Mascot({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`mascot ${small ? "mascot-small" : ""}`}
      aria-label="Jeni AI robot mascot"
      role="img"
    >
      <span className="mascot-antenna" />
      <span className="mascot-ear mascot-ear-left" />
      <span className="mascot-ear mascot-ear-right" />
      <span className="mascot-face">
        <i />
        <i />
        <b />
      </span>
    </div>
  )
}

function now() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function createMessage(role: Message["role"], text: string): Message {
  return { id: crypto.randomUUID(), role, text, time: now() }
}

function getDemoResponse(input: string, mode: View): string {
  const lower = input.toLowerCase()

  if (
    lower.includes("translate") ||
    (mode === "tools" && lower.includes("spanish"))
  ) {
    return `Translation · English → Spanish\n\n“Bienvenido a Jeni AI, tu asistente creativo.”\n\nThis is a demo translation. Connect a translation service for production-grade language coverage and verification.`
  }
  if (lower.includes("image") || lower.includes("floating above")) {
    return `Image prompt\n\nA breathtaking futuristic metropolis floating above a sea of luminous clouds at golden hour, sweeping glass towers connected by suspended gardens, small airships moving between structures, cinematic wide-angle composition, violet and cobalt atmosphere, volumetric light, intricate architectural detail, photorealistic, 8K.\n\nJeni AI has prepared the prompt. Actual image generation requires a configured image-generation API.`
  }
  if (lower.includes("idea") || lower.includes("sustainable")) {
    return `Here are five directions to explore:\n\n1. Loop Local — map nearby refill and repair stations.\n2. Carbon Pocket — turn daily choices into simple impact insights.\n3. Share Shelf — help neighbors lend rarely used household items.\n4. Green Route — compare travel routes by time, cost, and emissions.\n5. Second Story — scan products for reuse and upcycling ideas.\n\nEach concept can start as a focused MVP with community challenges and measurable goals.`
  }
  if (
    lower.includes("code") ||
    lower.includes("javascript") ||
    lower.includes("function")
  ) {
    return `Here’s a concise JavaScript solution:\n\nconst groupBy = (items, key) =>\n  items.reduce((groups, item) => {\n    const value = item[key];\n    (groups[value] ??= []).push(item);\n    return groups;\n  }, {});\n\nIt makes one pass through the array, creates a group only when needed, and returns an object keyed by each distinct value.`
  }
  if (mode === "search") {
    return `Web Search is currently in demo mode, so I can’t retrieve live results for “${input}”. Connect a search provider through a secure backend to enable current, cited answers. I can still help you refine the query or explain the topic from general knowledge.`
  }
  return `I can help with that. Here’s a practical way to approach it:\n\nStart by defining the outcome you want, then break it into the smallest useful steps. I can turn any step into a draft, checklist, code example, creative prompt, or translation.\n\nJeni AI is running in demo mode, so responses are generated locally until an AI backend is connected.`
}

function readStoredChats(): SavedChat[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

export default function App() {
  const [view, setView] = useState<View>("chat")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [savedChats, setSavedChats] = useState<SavedChat[]>(readStoredChats)
  const [attachment, setAttachment] = useState<File | null>(null)
  const [notice, setNotice] = useState("")
  const [listening, setListening] = useState(false)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const responseTimer = useRef<number | null>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(""), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(
    () => () => {
      if (responseTimer.current) window.clearTimeout(responseTimer.current)
    },
    [],
  )

  const persistChats = (chats: SavedChat[]) => {
    setSavedChats(chats)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  }

  const newChat = () => {
    if (responseTimer.current) window.clearTimeout(responseTimer.current)
    setMessages([])
    setInput("")
    setAttachment(null)
    setTyping(false)
    setView("chat")
  }

  const sendMessage = (text = input) => {
    const clean = text.trim()
    if (!clean || typing) return
    const attachmentNote = attachment
      ? `\n\nAttached file: ${attachment.name}`
      : ""
    setMessages((current) => [
      ...current,
      createMessage("user", clean + attachmentNote),
    ])
    setInput("")
    setAttachment(null)
    setTyping(true)
    responseTimer.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        createMessage("assistant", getDemoResponse(clean, view)),
      ])
      setTyping(false)
    }, 900)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    sendMessage()
  }

  const saveChat = () => {
    if (!messages.length) {
      setNotice("Start a conversation before saving.")
      return
    }
    const firstUser = messages.find((message) => message.role === "user")
    const chat: SavedChat = {
      id: crypto.randomUUID(),
      title: (firstUser?.text || "Conversation with Jeni")
        .split("\n")[0]
        .slice(0, 54),
      date: new Date().toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      messages,
    }
    persistChats([chat, ...savedChats])
    setNotice("Conversation saved.")
  }

  const exportChat = () => {
    if (!messages.length) {
      setNotice("There is no conversation to export yet.")
      return
    }
    const content = messages
      .map(
        (message) =>
          `${
            message.role === "user" ? "You" : "Jeni AI"
          } · ${message.time}\n${message.text}`,
      )
      .join("\n\n")
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }))
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "jeni-ai-conversation.txt"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const shareChat = async () => {
    if (!messages.length) {
      setNotice("There is no conversation to share yet.")
      return
    }
    const text = messages
      .map(
        (message) =>
          `${message.role === "user" ? "You" : "Jeni AI"}: ${message.text}`,
      )
      .join("\n\n")
    try {
      if (navigator.share)
        await navigator.share({ title: "Jeni AI conversation", text })
      else {
        await navigator.clipboard.writeText(text)
        setNotice("Conversation copied to clipboard.")
      }
    } catch {
      setNotice("Sharing was cancelled.")
    }
  }

  const startVoice = () => {
    const SpeechRecognition = (window as typeof window & {
      webkitSpeechRecognition?: new () => {
        lang: string
        start: () => void
        onresult: (event: {
          results: { 0: { 0: { transcript: string } } }[]
        }) => void
        onend: () => void
        onerror: () => void
      }
    }).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setNotice("Voice input is not supported in this browser.")
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.onresult = (event) => setInput(event.results[0][0].transcript)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => {
      setListening(false)
      setNotice("Voice input could not start. Check microphone permission.")
    }
    setListening(true)
    recognition.start()
  }

  const openSaved = (chat: SavedChat) => {
    setMessages(chat.messages)
    setView("chat")
  }

  const deleteSaved = (id: string) => {
    persistChats(savedChats.filter((chat) => chat.id !== id))
  }

  const changeView = (next: View) => {
    setView(next)
    if (next !== "saved" && next !== "chat") {
      setMessages([])
      setInput("")
    }
  }

  const welcomeTitle =
    view === "tools"
      ? "What would you like to create?"
      : view === "voice"
        ? "Talk naturally with Jeni"
        : view === "search"
          ? "What would you like to discover?"
          : "How can I help you today?"
  const welcomeSubtitle =
    view === "tools"
      ? "Choose a tool below to get started."
      : view === "voice"
        ? "Use your microphone to turn speech into a message."
        : view === "search"
          ? "Search is in demo mode until a provider is connected."
          : "Start a conversation or choose one of the suggestions below."

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Mascot />
          <div className="brand-copy">
            <h1>jeni ai</h1>
            <p>Smart. Friendly. Always Here.</p>
          </div>
        </div>

        <button className="new-chat" onClick={newChat}>
          <Icon name="plus" />
          <span>New Chat</span>
        </button>

        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={view === item.id ? "active" : ""}
              onClick={() => changeView(item.id)}
              aria-current={view === item.id ? "page" : undefined}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <div>
            <strong>Demo mode</strong>
            <small>Local assistant active</small>
          </div>
        </div>
      </aside>

      <main className="chat-panel" id="main-content">
        {view === "saved" ? (
          <section className="saved-screen">
            <div className="saved-heading">
              <span className="section-icon">
                <Icon name="bookmark" size={24} />
              </span>
              <h2>Saved Chats</h2>
              <p>Click a saved chat below to reopen it.</p>
            </div>
            <div className="saved-list">
              {savedChats.length ? (
                savedChats.map((chat) => (
                  <article className="saved-card" key={chat.id}>
                    <button
                      className="saved-open"
                      onClick={() => openSaved(chat)}
                    >
                      <span className="saved-card-icon">
                        <Icon name="chat" />
                      </span>
                      <span>
                        <strong>{chat.title}</strong>
                        <small>
                          {chat.date} · {chat.messages.length} messages
                        </small>
                      </span>
                      <Icon name="chevron" />
                    </button>
                    <button
                      className="delete-chat"
                      onClick={() => deleteSaved(chat.id)}
                      aria-label={`Delete ${chat.title}`}
                    >
                      <Icon name="trash" />
                    </button>
                  </article>
                ))
              ) : (
                <div className="empty-saved">
                  <Icon name="bookmark" size={30} />
                  <h3>No saved conversations yet</h3>
                  <p>Save a useful chat and it will appear here.</p>
                  <button onClick={newChat}>Start a conversation</button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <>
            <header className="chat-header">
              <div>
                <span className="online-dot" />
                <p>Ask anything. Create, learn and explore.</p>
              </div>
              <div className="header-actions">
                <button
                  onClick={exportChat}
                  aria-label="Download conversation"
                  title="Download"
                >
                  <Icon name="download" />
                </button>
                <button
                  onClick={saveChat}
                  aria-label="Save conversation"
                  title="Save"
                >
                  <Icon name="bookmark" />
                </button>
                <button
                  onClick={() => setView("saved")}
                  aria-label="View saved chat history"
                  title="History"
                >
                  <Icon name="clock" />
                </button>
                <button
                  onClick={shareChat}
                  aria-label="Share conversation"
                  title="Share"
                >
                  <Icon name="share" />
                </button>
              </div>
            </header>

            <div
              className={`conversation ${
                messages.length ? "has-messages" : ""
              }`}
            >
              {!messages.length ? (
                <section className="welcome">
                  <div className="welcome-mark">
                    <Mascot small />
                  </div>
                  <h2>{welcomeTitle}</h2>
                  <p>{welcomeSubtitle}</p>

                  {view === "voice" ? (
                    <button
                      className={`voice-hero ${listening ? "listening" : ""}`}
                      onClick={startVoice}
                    >
                      <span>
                        <Icon name="mic" size={30} />
                      </span>
                      <strong>
                        {listening ? "Listening…" : "Start voice input"}
                      </strong>
                      <small>Speech stays in your browser</small>
                    </button>
                  ) : (
                    <div className="suggestion-grid">
                      {suggestions.map((suggestion) => (
                        <button
                          className="suggestion-card"
                          key={suggestion.title}
                          onClick={() => sendMessage(suggestion.prompt)}
                        >
                          <span
                            className={`suggestion-icon ${suggestion.color}`}
                          >
                            <Icon name={suggestion.icon} />
                          </span>
                          <span>
                            <strong>{suggestion.title}</strong>
                            <small>{suggestion.description}</small>
                          </span>
                          <Icon name="chevron" size={17} />
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              ) : (
                <div className="message-list" aria-live="polite">
                  {messages.map((message) => (
                    <div
                      className={`message-row ${message.role}`}
                      key={message.id}
                    >
                      {message.role === "assistant" && (
                        <div className="bot-avatar">
                          <Mascot small />
                        </div>
                      )}
                      <div className="message-wrap">
                        <div className="message-label">
                          {message.role === "user" ? "You" : "Jeni AI"}
                        </div>
                        <div className="message-bubble">{message.text}</div>
                        <time>{message.time}</time>
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="message-row assistant">
                      <div className="bot-avatar">
                        <Mascot small />
                      </div>
                      <div className="message-wrap">
                        <div className="message-label">Jeni AI</div>
                        <div
                          className="typing-indicator"
                          aria-label="Jeni AI is typing"
                        >
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messageEndRef} />
                </div>
              )}
            </div>

            <div className="composer-area">
              {attachment && (
                <div className="attachment-chip">
                  <Icon name="paperclip" size={15} />
                  <span>{attachment.name}</span>
                  <button
                    onClick={() => setAttachment(null)}
                    aria-label="Remove attachment"
                  >
                    <Icon name="close" size={14} />
                  </button>
                </div>
              )}
              <form className="composer" onSubmit={submit}>
                <input
                  ref={fileRef}
                  className="file-input"
                  type="file"
                  accept=".txt,.md,.pdf,image/png,image/jpeg,image/webp"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null
                    if (file && file.size > 10 * 1024 * 1024) {
                      setNotice("Please choose a file smaller than 10 MB.")
                      event.target.value = ""
                      return
                    }
                    setAttachment(file)
                  }}
                />
                <button
                  type="button"
                  className="composer-action"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Attach a file"
                >
                  <Icon name="paperclip" />
                </button>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={
                    view === "search"
                      ? "Search with Jeni AI…"
                      : "Message Jeni AI…"
                  }
                  aria-label="Message Jeni AI"
                />
                <button
                  type="button"
                  className={`composer-action ${listening ? "active-mic" : ""}`}
                  onClick={startVoice}
                  aria-label="Use voice input"
                >
                  <Icon name="mic" />
                </button>
                <button
                  type="submit"
                  className="send-button"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                >
                  <Icon name="send" />
                </button>
              </form>
              <p className="disclaimer">
                Jeni AI can make mistakes. Check important information.
              </p>
            </div>
          </>
        )}
      </main>

      <aside className="activity-panel">
        <div className="activity-title">
          <span>
            <Icon name="activity" />
          </span>
          <div>
            <h2>Today&apos;s Activity</h2>
            <small>Demo statistics</small>
          </div>
        </div>
        <div className="activity-list">
          {activity.map(([label, value], index) => (
            <div className="activity-item" key={label}>
              <span className={`activity-bullet bullet-${index}`} />
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="activity-note">
          <Icon name="sparkles" size={17} />
          <p>
            <strong>You&apos;re on a roll!</strong>
            <br />
            12 day learning streak
          </p>
        </div>
      </aside>

      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
    </div>
  )
}
