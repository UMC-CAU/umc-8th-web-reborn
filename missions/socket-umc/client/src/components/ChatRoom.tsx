import { useEffect, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

interface ChatMessage {
  sender: string;
  text: string;
}

interface ChatRoomProps {
  room: string;
  nickname: string;
  onBack: () => void;
}

export default function ChatRoom({ room, nickname, onBack }: ChatRoomProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { lastMessage, sendMessage, status } = useWebSocket(
    `ws://localhost:3001?room=${room}`
  );

  const handleSend = () => {
    const message: ChatMessage = {
      sender: nickname,
      text: input.trim(),
    };
    sendMessage(JSON.stringify(message));
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  useEffect(() => {
    if (lastMessage) {
      try {
        const message = JSON.parse(lastMessage);

        if (message.sender !== nickname) {
          setMessages((prev) => [...prev, message]);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    }
  }, [lastMessage, nickname]);

  return (
    <div>
      <button onClick={onBack}>채팅방 나가기</button>
      <h2>방 이름: {room}</h2>
      <p>상태: {status}</p>

      {status !== "OPEN" ? (
        <p>채팅방에 연결중입니다.</p>
      ) : (
        <div
          style={{
            border: "1px solid #ccc",
            height: "300px",
            overflowY: "scroll",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}>
          {messages.map((msg, idx) => {
            const isMine = msg.sender === nickname;
            return (
              <div
                key={idx}
                style={{
                  alignSelf: isMine ? "flex-end" : "flex-start",
                  backgroundColor: isMine ? "yellow" : "darkgray",
                  color: isMine ? "#000" : "#fff",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: 4,
                  }}>
                  {msg.sender}
                </div>
                <div>{msg.text}</div>
              </div>
            );
          })}
        </div>
      )}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메세지를 입력해주세요."
      />
      <button onClick={handleSend}>전송</button>
    </div>
  );
}
