import type { WSMessage } from "./types";
import { useEffect, useRef, useState } from "react";

export type ConnectionStatus = "connecting" | "open" | "closed";

export function useChatSocket(username: string | null) {
    const [messages, setMessages] = useState<WSMessage[]>([]);
    const [status, setStatus] = useState<ConnectionStatus>("connecting");
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!username) return;
    
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const url = `${protocol}//${window.location.host}/ws?username=${encodeURIComponent(
          username
        )}`;
    
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => setStatus("open");
        socket.onclose = () => setStatus("closed");
        socket.onerror = () => setStatus("closed");

        socket.onmessage = (event: MessageEvent<string>) => {
            try {
                const data: WSMessage = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data]);
            } catch {
                console.error("Failed to parse message:", event.data);
            }
        };

        return () => {
            socket.close();
            socketRef.current = null;
        };
    }, [username]);

    function sendMessage(text: string) {
        const trimmed = text.trim();
        if (!trimmed || socketRef.current?.readyState !== WebSocket.OPEN) return;

        socketRef.current.send(JSON.stringify({ text: trimmed }));
    }

    return { messages, status, sendMessage };
}