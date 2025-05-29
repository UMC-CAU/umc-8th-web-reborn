import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";

const CartList = () : React.ReactElement => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className='flex flex-col items-center justify-center'>
        <ul>
          {cartItems.map((item) : React.ReactElement => {
            return <CartItem key={item.id} lp={item} />
          })}
        </ul>
        <h1>CartList</h1>
    </div>
  )
}

export default CartList;