import Navbar from "./components/Navbar"
import ChatContainer from "./components/ChatContainer"
import "./App.css"

function App() {
  return (
    <div className="app-wrapper">   {/* <-- top-level wrapper */}
      <Navbar />
      <ChatContainer />
    </div>
  )
}

export default App



