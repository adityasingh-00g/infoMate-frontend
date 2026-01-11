import { useState, useRef, useEffect } from "react"
import Message from "./Message"
import ChatInput from "./ChatInput"
import { sendChatMessage } from "../services/chatApi"

function ChatContainer() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function handleSend(query) {
    setMessages(prev => [...prev, { role: "user", text: query }])
    setLoading(true)

    try {
      const data = await sendChatMessage(query)
      setMessages(prev => [...prev, { role: "bot", text: data.answer }])
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "⚠️ Server error. Try again." }])
    }

    setLoading(false)
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
        {loading && (
          <div className="message bot">
            <div className="bubble typing">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  )
}

export default ChatContainer
