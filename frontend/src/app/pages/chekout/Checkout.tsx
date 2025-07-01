
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import type { TShippingAdress } from "../../types/types";
import { clearCart } from "../../redux/features/product/productSlice/productSlice";
import { useSoldProductMutation } from "../../redux/features/product/productAPi/productApi";
import toast from "react-hot-toast";

const Checkout = () => {
    const dispatch = useAppDispatch();
    // const [decreaseProduct] = useDecreaseProductMutation()
    const [ soldQuantity] = useSoldProductMutation()
      const {register, handleSubmit} = useForm<TShippingAdress>();
        const cartItems = useAppSelector((state) => state.cart.items);
        const backendUrl = import.meta.env.VITE_API_URL;
  
        const onSubmit:SubmitHandler<TShippingAdress>= async(formData)=>{
   if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }
    const payload = {
      
      shippingData: formData,
      cartItems,
    };
    try {
      if (formData.paymentMethod === "stripe") {
        console.log("hello stripe")
        const res = await fetch(`${backendUrl}/api/stripe/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({formData,cartItems}),
        });
        const data = await res.json()
        if (data?.url) {
          window.location.href = data.url;
        }
      } else if (formData.paymentMethod === "cod") {
        const res = await fetch(`${backendUrl}/api/order/cod`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (data?.success) {
        toast.success('order place sucessfully')
         for (const item of cartItems) {
    try {
      // await decreaseProduct({ id: item._id, quantity: item.quantity }).unwrap();
      await soldQuantity({ id: item._id, quantity: item.quantity }).unwrap()
    } catch (error) {
      console.error("Stock decrease failed:", error);
    }
  }
        dispatch(clearCart())
          window.location.href = `/order`;
        }else{
          window.location.href = `/payment-cancel`
        }
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }

        }
  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Check out</h1>
   <div className=" lg:px-6 sm:px-0 lg:w-[50%] sm:w-full mx-auto">
       {cartItems.map((item) => (
        <div key={item._id} className="mb-2 flex justify-between items-center " >
         <div className="flex items-center gap-x-1">
            <div><img src={item?.image} alt=""  className="w-16 h-14 rounded"/></div>
            <div>{item.productName}</div>
        
      </div>
          <div className="font-body">৳{item.price} x {item.quantity}</div>
          <div className="font-body"> Total ৳{item.price*item.quantity} </div>
        </div>
      ))}
   </div>
      <div>
         <div>
                   <div  className=" justify-center items-center  backdrop:blur-sm  rounded-lg  mx-auto lg:w-96 w-11/12 my-auto lg:mt-10 mt-12  p-4 ">
                        {/* title */}
                        <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
                           <p className="lg:text-2xl text-xl font-body">Shipping Address</p>
                        </div>
                        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Address */}
        <input {...register("name")} required placeholder="Name" className="input" />
        <input {...register("email")} required placeholder="Email" type="email" className="input" />
        <input {...register("phone")} required placeholder="Phone" type="number" className="input" />
        
        <input {...register("address")} required placeholder="Address" className="input" />
        <input {...register("zila")} required placeholder="Zila" className="input" />
        <input {...register("upozila")} required placeholder="Upozila" className="input" />
        {/* Payment method */}
        <div className="space-y-2">
          <label><input type="radio" required value="stripe" {...register("paymentMethod")} /> Pay with Stripe</label><br />
          <label><input type="radio" required value="cod" {...register("paymentMethod")} /> Cash on Delivery</label>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Place Order</button>
      </form>
                       
      </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;