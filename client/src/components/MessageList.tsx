import type { WSMessage } from "../types";

type MessageListProps = {
    messages: WSMessage[];
    currentUser: string;
}

export function MessageList({messages, currentUser}: MessageListProps  ) {
    return (
        <div></div>
    )
}