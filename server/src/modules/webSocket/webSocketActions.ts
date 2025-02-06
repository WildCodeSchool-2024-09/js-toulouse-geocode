import { EventEmitter } from "node:events";
import type { WebsocketRequestHandler } from "express-ws";
import type * as webSocket from "ws";

const connections: { [key: string]: webSocket.WebSocket } = {};
export const eventEmitter = new EventEmitter();

const webSocketEngine: WebsocketRequestHandler = (ws, req) => {
  eventEmitter.on("update", (item) => ws.send(item));
};

export default { webSocketEngine };
