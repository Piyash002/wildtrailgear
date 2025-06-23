
import { useAppSelector } from "../../redux/Hooks";

const Checkout = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleCheckout = async () => {
    if (!cartItems.length) {
  alert("Your cart is empty!");
  return;
}

    try {
      const res = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });
      const data = await res.json();
      if (!data.url) {
  alert("Something went wrong. No Stripe URL returned.");
  return;
}
      console.log(res)
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout Error:", err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.map((item) => (
        <div key={item._id} className="mb-2 flex justify-between">
          <div>{item.productName}</div>
          <div>৳{item.price} x {item.quantity}</div>
        </div>
      ))}
      <button
        onClick={handleCheckout}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default Checkout;
