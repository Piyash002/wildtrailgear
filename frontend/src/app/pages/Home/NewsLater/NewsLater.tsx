import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Newsletter = () => {

  const backendUrl = import.meta.env.VITE_API_URL;
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    console.log(email)
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
    // You can call your backend API here with fetch or axios
    fetch(`${backendUrl}/api/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message || "Subscribed successfully!"))
      .catch(() => alert("Subscription failed. Please try again."));
    e.target.reset();
  };

  return (
    <section className="bg-gray-100 text-gray-800 lg:py-8 py-4 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-3">📧 Subscribe to our Newsletter</h2>
        <p className="mb-6 text-gray-700">
          Stay updated with our latest offers, updates, and new products.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-1 justify-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="px-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-2/3"
            required
          />
          <button
            type="submit"
            className="bg-secondary hover:bg-primary text-white px-1 rounded-md font-semibold transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
