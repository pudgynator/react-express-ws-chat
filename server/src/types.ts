
export type ChatMessage = {
    type: "message";
    user: string;
    text: string;
    timestamp: number;
};

export type SystemMessage = {
    type: "system";
    text: string;
    timestamp: number;
};

export type WSMessage = ChatMessage | SystemMessage;

export function isIncomingChatMessage(data: unknown): data is { type: "message"; text: string } {
    return (
        typeof data === 'object' && data !== null &&
        (data as Record<string, unknown>).type === 'message' &&
        typeof (data as Record<string, unknown>).text === 'string'
    );
}