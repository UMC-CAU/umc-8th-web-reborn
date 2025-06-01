import CartItem from "./CartItem.tsx";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const CartList = (): React.ReactElement => {
  const { cartItems } = useCartInfo();
  const { clearCart } = useCartActions();

  const handleAllClearButton = () => {
    clearCart();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item, index): React.ReactElement => {
          return <CartItem key={index} lp={item} />;
        })}
      </ul>
      <h1>CartList</h1>
    </div>
  );
};

export default CartList;
