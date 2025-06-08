import { useState } from "react";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import RoomList from "./components/RoomList";

// 1. 닉네임을 입력
// 2. 방을 선택
// 3. 그 방에 입장해서 OPEN인 상태일 때, 메세지를 주고받아요.

function App() {
  const [nicknameInput, setNicknameInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState<string | null>(null);

  if (!nickname) {
    return (
      <div>
        <h2>닉네임을 입력해주세요.</h2>
        <input
          value={nicknameInput}
          onChange={(e) => setNicknameInput(e.target.value)}
          placeholder="닉네임을 입력해주세요."
        />
        <button
          onClick={() => {
            if (nicknameInput.trim()) {
              setNickname(nicknameInput.trim());
            }
          }}>
          입장하기
        </button>
      </div>
    );
  }

  return room ? (
    <ChatRoom room={room} nickname={nickname} onBack={() => setRoom(null)} />
  ) : (
    <RoomList onEnterRoom={setRoom} />
  );
}

export default App;
