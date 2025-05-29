import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Lp } from "../types/cart";
import initialCartItemsData from "../constants/cartItems";

export interface CartState {
    cartItems: CartItem;
    amount: number;
    total: number;
}

const initialState: CartState = {
    cartItems: initialCartItemsData as CartItem,
    amount: 0,
    total: 0,
}

// cartSlice 생성
// cartSlice -> reduxToolkit에서 제공하는 기능
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 카트 아이템 수량 증가
        increase: (state, action: PayloadAction<{ id: string }>) : void => {
            const itemId = action.payload.id;
            // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
            const item = state.cartItems.find((cartItem) : boolean =>  cartItem.id === itemId);
            if (item) {
                item.amount += 1;
            }
        },
        // 카트 아이템 수량 감소
        decrease: (state, action: PayloadAction<{ id: string }>) : void => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem) : boolean =>  cartItem.id === itemId);
            if (item) {
                item.amount -= 1;
                if (item.amount === 0) {
                    // Remove item if amount is 0
                    state.cartItems = state.cartItems.filter((cartItem) : boolean =>  cartItem.id !== itemId);
                }
            }
        },
        // removeItem 카트 아이템 제거
        removeItem: (state, action: PayloadAction<{ id: string }>) : void => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter((cartItem) : boolean =>  cartItem.id !== itemId);
        },
        // clearCart 카트 아이템 전체비우기
        clearCart: (state) : void => {
            state.cartItems = [];
            state.amount = 0;
            state.total = 0;
        },
        // calculateTotal 총 개수, 총 가격 계산
        calculateTotal: (state) : void => {
            let amount = 0;
            let total = 0;

            for (const item of state.cartItems) {
                amount += item.amount;
                total += item.amount * item.price;
            }
            state.amount = amount;
            state.total = total;
        },  
    },
});

// Actions generated from the slice
export const { increase, decrease, removeItem, clearCart, calculateTotal } = cartSlice.actions;

// duck pattern reducer는 export default로 내보내야 함.
const cartReducer = cartSlice.reducer;

export default cartReducer;
