import { useEffect, useRef } from "react";
import type { WSMessage } from "../types";
import { Message } from "./Message";

type MessageListProps = {
    messages: WSMessage[];
    currentUser: string;
}

export function MessageList({messages, currentUser}: MessageListProps  ) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' });
    }, [messages])
    return (
        <div className='flex-1 overflow-y-auto px-4 py-3'>
            {messages.length === 0 && (
                <div className="text-center text-xs text-taupe-400 mt-7">
                    No messages yet - say hi!
                </div>
            )}
            {messages.map((msg, i) => (
                <Message
                    key={i}
                    message={msg}
                    isOwn={msg.type === "message" && msg.user === currentUser}
                />
            ))}
            <div ref={bottomRef}/>
        </div>
    )
}