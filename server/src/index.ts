import express from 'express';
import { createServer } from 'http';
import { WebSocketServer,  WebSocket } from 'ws';
import path from "path";
import { fileURLToPath } from "url";
import type { WSMessage } from "./types.js";
import { isIncomingChatMessage } from "./types.js";
import "dotenv/config" ;

const PORT = process.env.PORT || 3000;
console.log("PORT from env:", process.env.PORT);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws'});

const clients = new Map<WebSocket, { username: string }>();

function broadcast(msg: WSMessage ) {
    const payload = JSON.stringify(msg);
    for (const client of clients.keys()) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    }
};

function getUniqueUsername(requested: string): string {
    const existingUsernames = Array.from(clients.values()).map(client => client.username);

    if (!existingUsernames.includes(requested)) {
        return requested;
    }

    let suffix = 2;
    let newUsername = requested + suffix;

    while (existingUsernames.includes(newUsername)) {
        suffix++;
        newUsername  = requested + suffix;
    };

    return newUsername;
}

wss.on('connection', (ws, req) => {
    const url = new URL(req.url ?? '', `http://${req.headers.host}` )
    const requestedUsername= url.searchParams.get('username')?.trim() || 'Anonymous';

    const username = getUniqueUsername(requestedUsername);
    clients.set(ws, { username });

    ws.send(JSON.stringify({ type: 'welcome', username }));

    broadcast({
        type: "system",
        text: `${username} joined the chat`,
        timestamp: Date.now(),
    });

    broadcast({
        type: 'presence',
        users: Array.from(clients.values()).map(client => client.username),
    })

    ws.on('message', (raw) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(raw.toString());
        } catch {
          return;
        }

        const clientInfo = clients.get(ws);
        if (!clientInfo) return;

        if (
            typeof parsed === "object" &&
            parsed !== null &&
            (parsed as Record<string, unknown>).type === "typing"
        ) {
            broadcast({ type: "typing", user: clientInfo.username });
            return;
        }

        if (!isIncomingChatMessage(parsed)) return;

        broadcast({
            type: "message",
            user: clientInfo.username,
            text: parsed.text,
            timestamp: Date.now(),
        });
    });

    ws.on('close', () => {
        const clientInfo = clients.get(ws);
        clients.delete(ws);
        if (clientInfo) {
            broadcast({
                type: "system",
                text: `${clientInfo.username} left the chat`,
                timestamp: Date.now(),
            });

            broadcast({
                type: 'presence',
                users: Array.from(clients.values()).map(client => client.username),
            })
        }
    });


    ws.on('error', () => {
        clients.delete(ws);
    });
})

const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('/*splat', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});