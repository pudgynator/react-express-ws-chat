import type { WSMessage } from "../types";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import type { ConnectionStatus as Status } from "../useChatSocket";

type ChatWindowProps = {
    username: string;
    messages: WSMessage[];
    status: Status;
    onSend: (text: string) => void;
  }

export function ChatWindow({ username, messages, status, onSend }: ChatWindowProps) {
    return (
        <div className='flex h-[600px] w-full max-w-md flex-col rounded-2xl border border-taupe-200 shadow-sm'>
            <div className='flex items-center justify-between border-b border-taupe-200 px-4 py-3'>
                <span className="font-semibold text-taupe-900">Chat</span>
            </div>
            <MessageList messages={messages} currentUser={username} />
            <MessageInput onSend={onSend} disabled={status !== "open"} />
        </div>
    )
}