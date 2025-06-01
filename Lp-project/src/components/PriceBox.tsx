import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const PriceBox = (): React.ReactElement => {
  const { total } = useCartInfo();
  const { clearCart } = useCartActions();

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="p-12 flex justify-end">
      <div>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          장바구니 초기화
        </button>
        <div className="text-white">총 개수 : {total}원</div>
      </div>
    </div>
  );
};

export default PriceBox;
