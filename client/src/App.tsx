import { useState } from "react"
import { ChatWindow } from "./components/ChatWindow"
import { LoginScreen } from "./components/LoginScreen";
import { useChatSocket } from "./useChatSocket";

function App() {
    const [username, setUsername] = useState<string | null>(null);
    const { messages, status, typingUsers, presentUsers, sendMessage, sendTyping } = useChatSocket(username);

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
            typingUsers={typingUsers}
            onTyping={sendTyping}
            presentUsers={presentUsers}
        />
      </div>
    )
}

export default App
