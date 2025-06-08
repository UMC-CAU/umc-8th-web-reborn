import { useEffect, useRef, useState } from "react";

export const WebSocketStatus = {
  CONNECTING: "CONNECTING",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  RECONNECTING: "RECONNECTING",
};

export type WebSocketStatus =
  (typeof WebSocketStatus)[keyof typeof WebSocketStatus];

export interface WebSocketHook {
  lastMessage: string | null;
  status: WebSocketStatus;
  sendMessage: (message: string) => void;
}

export interface WebSocketOptions {
  maxReconnectAttempts?: number; // 최대 재연결 시도 횟수
  reconnectDelay?: (attempt: number) => number; // 시도 횟수 기반 딜레이 함수
  onOpen?: () => void; // 연결 성공 시 콜백
  onMessage?: (message: string) => void; // 메시지 수신 시 콜백
  onClose?: (event: CloseEvent) => void; // 연결 종료 시 콜백
  onError?: (error: Error) => void; // 오류 발생 시 콜백
}

export const useWebSocket = (
  url: string,
  {
    maxReconnectAttempts = 5,
    reconnectDelay = (attempt) => Math.min(5000, Math.pow(2, attempt) * 1000), // 기본: 지수 백오프 (최대 5초)
    onOpen,
    onMessage,
    onClose,
    onError,
  }: WebSocketOptions = {}
): WebSocketHook => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.CONNECTING
  ); // 웹소켓 상태

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempt = useRef<number>(0); // 재연결 시도 횟수

  // WebSocket 연결 및 이벤트 핸들러 설정
  const connectWebSocket = () => {
    setStatus(WebSocketStatus.CONNECTING);
    const ws = new WebSocket(url);
    wsRef.current = ws;

    // 연결 성공 시
    ws.onopen = () => {
      setStatus(WebSocketStatus.OPEN);
      reconnectAttempt.current = 0;
      onOpen?.(); // 사용자가 정의한 콜백 호출
    };

    // 메시지 수신 시
    ws.onmessage = (event) => {
      setLastMessage(event.data);
      onMessage?.(event.data); // 사용자가 정의한 콜백 호출
    };

    // 에러 발생
    ws.onerror = (error) => {
      onError?.(error as unknown as Error);
    };

    // 연결 종료
    ws.onclose = (event) => {
      setStatus(WebSocketStatus.CLOSED);
      onClose?.(event);

      // 재연결 시도 조건 확인
      if (reconnectAttempt.current < maxReconnectAttempts) {
        reconnectAttempt.current++; // 재연결 시도 횟수 증가
        setStatus(WebSocketStatus.RECONNECTING); // 재연결 중 상태 업데이트
        // 재연결 예약약
        setTimeout(connectWebSocket, reconnectDelay(reconnectAttempt.current));
      } else {
        setStatus(WebSocketStatus.CLOSED);
        onClose?.(event);
      }
    };
  };

  // 메세지 전송 함수
  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message); // 연결이 오픈될 때만 전송
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  };

  // 컴포넌트 마운트 시 웹소켓 연결
  useEffect(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      connectWebSocket(); // 컴포넌트 마운트될 때 WebSocket 연결 종료료
    }
  }, [url]);

  return { lastMessage, status, sendMessage };
};
