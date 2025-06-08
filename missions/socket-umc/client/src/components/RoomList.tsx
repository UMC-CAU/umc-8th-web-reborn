import { useEffect, useState } from "react";

interface RoomListProps {
  onEnterRoom: (room: string) => void;
}

export default function RoomList({ onEnterRoom }: RoomListProps) {
  // 서버에서 받아온 방 목록
  const [rooms, setRooms] = useState<string[]>([]);

  // 새 방 이름 입력 상태
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then((response) => response.json())
      .then(setRooms);
  }, []);

  const handleEnter = (room: string) => {
    onEnterRoom(room);
  };

  return (
    <div>
      <h1>오타니 톡</h1>

      <ul>
        {rooms.map((room) => (
          <li key={room}>
            <span>{room}</span>
            <button onClick={() => handleEnter(room)}>방 입장하기</button>
          </li>
        ))}
      </ul>

      <input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} />
      <button onClick={() => handleEnter(newRoom)}>방 만들기</button>
    </div>
  );
}
