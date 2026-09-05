
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

export type PresenceMessage = {
    type: 'presence';
    users: string[];
}

export type WelcomeMessage = {
    type: "welcome";
    username: string;
};

export type WSMessage = ChatMessage | SystemMessage | TypingMessage | PresenceMessage | WelcomeMessage;
export type StoredMessage = ChatMessage | SystemMessage;
