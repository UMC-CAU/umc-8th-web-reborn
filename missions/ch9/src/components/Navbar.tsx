import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { calculateTotal } from "../slices/cartSlice";
import { useEffect } from "react";

const Navbar = () => {
    const { amount, cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(calculateTotal());
    }, [dispatch, cartItems]);

    return (
        <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
            <h1 
                onClick={():void => {
                    window.location.href = '/';
                }} 
                className='text-2xl font-semibold cursor-pointer'
            >
                덕화니의프로젝트
            </h1>
            <div className='flex items-center space-x-2'>
                <FaShoppingCart className='text-2xl' />
                <span className='text-xl font-medium'>{amount}</span>
            </div>
        </div>

    )
}

export default Navbar;