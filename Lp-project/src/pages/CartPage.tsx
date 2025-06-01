import React, { useEffect } from "react";
import CartList from "../components/CartList";
import { useCartInfo, useCartActions } from "../hooks/useCartStore";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartPage: React.FC = () => {
  const { amount, cartItems, total } = useCartInfo();
  const { clearCart, calculateTotal } = useCartActions();
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotal();
  }, [cartItems, calculateTotal]);

  const handleClearCart = () => {
    if (cartItems.length > 0 && confirm("장바구니를 비우시겠습니까?")) {
      clearCart();
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">장바구니</h2>
        <div className="flex items-center space-x-2">
          <FaShoppingCart className="text-2xl text-white" />
          <span className="text-white text-lg font-semibold">{amount}</span>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-400">장바구니가 비어있습니다.</p>
      ) : (
        <>
          <CartList />
          <div className="mt-6 p-4 bg-gray-800 rounded shadow">
            <h3 className="text-xl font-semibold mb-2 text-white">주문 요약</h3>
            <p className="text-lg text-white">총액: {total} 원</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
              >
                장바구니 비우기
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
              >
                결제하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
