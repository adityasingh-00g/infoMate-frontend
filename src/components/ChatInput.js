import { useState, useRef } from "react"
import { FiSend, FiPlus } from "react-icons/fi"
import { uploadDocuments } from "../services/documentApi"

function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput("")
  }

  async function handleFileChange(e) {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploading(true)

    try {
      await uploadDocuments(files)
      alert(`✅ ${files.length} document(s) uploaded successfully`)
    } catch (err) {
      console.error("Upload error:", err)
      alert("❌ Document upload failed")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      {/* Upload button */}
      <button
        type="button"
        className="icon-btn"
        onClick={() => fileInputRef.current.click()}
        disabled={disabled || uploading}
        title="Upload documents"
      >
        <FiPlus size={28} />
      </button>

      {/* Text input */}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={
          uploading ? "Uploading documents..." : "Type your message..."
        }
        disabled={disabled || uploading}
      />

      {/* Send button */}
      <button
        type="submit"
        className="icon-btn"
        disabled={disabled || uploading}
      >
        <FiSend size={28} />
      </button>
    </form>
  )
}

export default ChatInput
