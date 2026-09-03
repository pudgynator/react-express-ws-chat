
export type ChatMessage = {
    type: 'message';
    user: string;
    text: string;
    timestamp: number;
};

export type SystemMessage = {
    type: 'system';
    text: string;
    timestamp: number;
};

export type TypingMessage = {
    type: 'typing';
    user: string;
}

export type WSMessage = ChatMessage | SystemMessage | TypingMessage;
export type StoredMessage = ChatMessage | SystemMessage;
