
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

export type WSMessage = ChatMessage | SystemMessage;
