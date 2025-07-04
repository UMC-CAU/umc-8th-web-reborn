import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

// 1. 저장소 생성성
function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
      cart: cartReducer,
    },
  });
  return store;
}

// store를 활용할 수 있도록 내보내야 함.
// 여기서 실행해서 스토어를 빼준다.
// 싱글톤패턴
const store = createStore();

export default store;

// 스토어 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
