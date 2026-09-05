import type { StoredMessage, WSMessage } from "./types";
import { useEffect, useRef, useState } from "react";

export type ConnectionStatus = "connecting" | "open" | "closed";
const typing_timeout = 2000;

export function useChatSocket(username: string | null) {
    const [messages, setMessages] = useState<StoredMessage[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [presentUsers , setPresentUsers] = useState<string[]>([]);
    const [resolvedUsername, setResolvedUsername] = useState<string | null>(null);
    const [status, setStatus] = useState<ConnectionStatus>("connecting");
    const socketRef = useRef<WebSocket | null>(null);
    const typingTimeouts = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

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

                if (data.type === "welcome") {
                    setResolvedUsername(data.username);
                    return;
                }

                if (data.type === 'typing') {
                    const user = data.user;

                    setTypingUsers((prevTyping) => {
                        if (!prevTyping.includes(user)) {
                            return [...prevTyping, user];
                        }
                        return prevTyping;
                    });

                    const existingTimeout = typingTimeouts.current.get(user);
                    if (existingTimeout) clearTimeout(existingTimeout);

                    const newTimeout = setTimeout(() => {
                        setTypingUsers((prev) => prev.filter((u) => u !== user));
                        typingTimeouts.current.delete(user);
                    }, typing_timeout);

                    typingTimeouts.current.set(user, newTimeout);
                    return;
                } if (data.type === 'presence') {
                    setPresentUsers(data.users);
                } else {
                    setMessages((prevMessages) => [...prevMessages, data]);
                };
 
            } catch {
                console.error("Failed to parse message:", event.data);
            }
        };

        return () => {
            socket.close();
            socketRef.current = null;
            typingTimeouts.current.forEach((t) => clearTimeout(t));
            typingTimeouts.current.clear();
        };
    }, [username]);

    function sendMessage(text: string) {
        const trimmed = text.trim();
        if (!trimmed || socketRef.current?.readyState !== WebSocket.OPEN) return;

        socketRef.current.send(JSON.stringify({ type: 'message',text: trimmed }));
    };
    
    function sendTyping() {
        if (socketRef.current?.readyState !== WebSocket.OPEN) return;
        socketRef.current.send(JSON.stringify({ type: 'typing' }));
    }

    return { messages, status, typingUsers, presentUsers, username: resolvedUsername ?? username, sendMessage, sendTyping};
}