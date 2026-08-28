import { useState } from "react"
import { ChatWindow } from "./components/ChatWindow"
import { LoginScreen } from "./components/LoginScreen";
import { useChatSocket } from "./useChatSocket";

function App() {
    const [username, setUsername] = useState<string | null>(null);
    const { messages, status, sendMessage } = useChatSocket(username);

    if (!username) {
      return <LoginScreen onJoin={setUsername} />; 
    }
    return (
      <div className="flex h-screen items-center justify-center bg-taupe-100">
        <ChatWindow 
            username={username}
            messages={messages}
            status={status}
            onSend={sendMessage}
        />
      </div>
    )
}

export default App
