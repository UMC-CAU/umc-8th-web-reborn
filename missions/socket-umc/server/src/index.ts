import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket as WSWebSocket } from "ws";
import { parse } from "url";
import cors from "cors";

const app = express();
app.use(cors());
const server = createServer(app);
const wss = new WebSocketServer({ server });

interface RoomMap {
  [roomId: string]: Set<WSWebSocket>;
}

const rooms: RoomMap = {};

wss.on("connection", (ws: WSWebSocket, req) => {
  const { query } = parse(req.url || "", true);
  const roomId = query.room as string;

  if (!roomId) {
    ws.close();
    return;
  }

  // 해당 room이 존재하지 않으면 새로 만들고, 현재 연결된 클라이언트를 추가.
  rooms[roomId] = rooms[roomId] || new Set();
  rooms[roomId].add(ws);

  // 메시지 수신 시 같은 room에 있는 모든 클라이언트에게 메시지를 Broadcast 한다.
  // 단, 자기 자신에게는 전송하지 않는다. client !== ws 조건을 추가한다.
  // client.readyState === ws.OPEN 조건을 추가하여 연결이 열린 상태인 클라이언트에게만 메시지를 보낸다.
  ws.on("message", (message) => {
    rooms[roomId].forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    rooms[roomId].delete(ws);
  });
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/rooms", (req, res) => {
  res.json(Object.keys(rooms));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 1. 닉네임을 입력
// 2. 방을 선택
// 3. 그 방에 입장해서 OPEN인 상태일 때, 메세지를 주고받아요.
