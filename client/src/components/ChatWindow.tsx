import type { WSMessage } from "../types";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import type { ConnectionStatus as Status } from "../useChatSocket";
import { ConnectionStatus } from "./ConnectionStatus";

type ChatWindowProps = {
    username: string;
    messages: WSMessage[];
    status: Status;
    onSend: (text: string) => void;
    onTyping: () => void;
    typingUsers: string[];
  }

export function ChatWindow({ username, messages, status, onSend, onTyping, typingUsers}: ChatWindowProps) {
    const othersTyping = typingUsers.filter((u) => u !== username);

    return (
        <div className='flex h-[600px] w-full max-w-md flex-col rounded-2xl border border-taupe-200 shadow-sm'>
            <div className='flex items-center justify-between border-b border-taupe-200 px-4 py-3'>
                <span className="font-semibold text-taupe-900">Chat</span>
                <ConnectionStatus status={status} />
            </div>
    
            <MessageList messages={messages} currentUser={username} />

            {othersTyping.length > 0 && (
                <div className="px-4 py-1 text-xs italic text-taupe-400">
                    {othersTyping.join(", ")}{" "}
                    {othersTyping.length === 1 ? "is" : "are"} typing…
                </div>
            )} 
            <MessageInput onSend={onSend} onTyping={onTyping} disabled={status !== "open"} />
        </div>
    )
}