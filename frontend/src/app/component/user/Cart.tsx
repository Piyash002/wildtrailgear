
import { MdAddShoppingCart } from 'react-icons/md';
import { useAppSelector } from '../../redux/Hooks';
import { NavLink } from 'react-router';

const Cart = () => {
      const cartLength = useAppSelector((state) => state.cart.items.length) as number;
    return (
        <div>
              <div className=" flex justify-center items-center lg:gap-x-8 gap-2">
           <NavLink to={"/cart"}>
            <div className="relative   rounded-full bg-opacity-85 "> 
              <h1 className=" absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center  ">{cartLength}</h1>
             <MdAddShoppingCart className="text-2xl text-white" />
            </div>
           </NavLink>
          </div>
        </div>
    );
};

export default Cart;