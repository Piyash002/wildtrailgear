
import { NavLink } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../redux/features/product/productSlice/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import type { RootState } from "../../redux/store/Store";
import { MdDeleteForever } from "react-icons/md";

const CartPage = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state:RootState)=>state.cart.items)
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      cartItems.length === 0 ? <><h1 className="text-center items-center mt-4 text-2xl font-body">No Item found!</h1> </> : <> 
      <div className="lg:p-4  border border-slate-100">
      <h1 className=" text-xl font-bold mb-2">Cart Items</h1>
      <div className="  border bg-primary border-slate-100 grid grid-cols-5 mb-2 p-1 text-white">         
      <th className="col-span-1">Name</th>
      <th className="col-span-1">Price</th>
      <th className="col-span-1">Quantity</th>
      <th className="col-span-1">Total</th>
      <th className="col-span-1">Remove</th>
          </div>
      {cartItems.map(item => (
        
        <div key={item._id}  className="grid grid-cols-5   border border-slate-100 mb-3 items-center p-2"> 
              
          <tr  className=" col-span-1 lg:flex  items-center gap-x-1 ">
          <img src={item.image} alt={item.productName} className="lg:w-16 lg:h-16 w-8 h-8 rounded" />
          <h1 className="overflow-clip">{item.productName}</h1>
          </tr>
          <tr className="col-span-1 mx-auto text-secondary text-md font-brand"><div>৳{item.price}</div></tr>
          <tr className="col-span-1  mx-auto"><div className="flex items-center">
            <button className="bg-gray-100 px-2 text-slate-400" onClick={() => dispatch(decreaseQuantity(item._id))}>-</button>
            <span className="px-2">{item.quantity}</span>
            <button className=" bg-gray-100 px-2 text-slate-400" onClick={() => dispatch(increaseQuantity(item._id))}>+</button>
          </div>
          </tr>
          <tr className="col-span-1  mx-auto text-secondary text-md font-brand ">
            <div>৳{item.price * item.quantity}</div>
            </tr>
            <tr className="col-span-1  mx-auto">
               <button className="text-red-600" onClick={() => dispatch(removeFromCart(item._id))}><MdDeleteForever /></button>
            </tr>
          </div>
      ))}
      <div className="text-right font-body  mt-4 ">
        <span className="bg-gray-300 p-4 ">SubTotal: <span className="text-xl">৳</span> {total}</span>
      </div>

      <button className="mt-4 bg-secondary text-white px-4 py-2" >
        <NavLink to='/checkout'>Checkout</NavLink>
      </button>
    </div>
      </>
    );
};

export default CartPage;