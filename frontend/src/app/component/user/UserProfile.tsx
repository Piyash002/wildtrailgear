import { useState,  type ChangeEvent, type FormEvent } from "react";
import CartPage from "../../pages/CartPage/CartPage";




export const UserProfile =()=> {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [name, setName] = useState("John Doe");
  const [address, setAddress] = useState("1234 Main St, City, Country");


  // Handle image change & preview
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  // Handle form submission (mock)
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Here you would call API to update user profile with name, address, and imageFile

    alert("Profile updated successfully!");
    if (imageFile) {
      URL.revokeObjectURL(imagePreview!); // Clean up preview URL
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

      {/* Profile Update Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-12 max-w-3xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-6">
          <div className="w-32 h-32 mx-auto sm:mx-0 rounded-full overflow-hidden border-2 border-green-600">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-green-100 text-green-700 font-semibold text-xl">
                No Image
              </div>
            )}
          </div>

          <div className="mt-4 sm:mt-0 flex-1">
            <label
              htmlFor="imageUpload"
              className="block text-green-700 font-semibold cursor-pointer hover:underline"
            >
              Change Profile Image
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          Update Profile
        </button>
      </form>

      {/* Cart Section */}
      <section className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Cart</h2>
        <CartPage/>
      </section>

  
    </div>
  );
}
