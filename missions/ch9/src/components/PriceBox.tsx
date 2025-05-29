import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const PriceBox = () : React.ReactElement => {
    const { total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <div className="p-12 flex justify-end">
            <div>
                <button 
                    onClick={handleClearCart} 
                    className="border p-4 rounded-md cursor-pointer">
                        장바구니 초기화
                </button>   
                <div>총 개수 : {total}원</div>
            </div>  

        </div>
    )
}

export default PriceBox;

