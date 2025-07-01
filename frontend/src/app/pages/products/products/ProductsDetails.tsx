/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/Hooks";
import {
  useGetProductByCategoryQuery,
  useGetProductDteailsQuery,
} from "../../../redux/features/product/productAPi/productApi";
import { addToCart } from "../../../redux/features/product/productSlice/productSlice";
import type { TCartItem } from "../../../types/types";
import { useState } from "react";
import toast from "react-hot-toast";
import ProductDetailsImage from "../../../component/user/ProductDetailsImage";
import ProductReviews from "../../../component/user/ReviewForm";


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: products,
    isLoading: loadingProduct,
    error,
  } = useGetProductDteailsQuery(id!);

  const product = products?.data || {};
  const images = product.images || [];
  const mainImage = images.find((img: any) => img.isMain) || images[0];

  const [quantity, setQuantity] = useState(1);
  const cartItems: TCartItem = {
    _id: product?._id,
    image: mainImage?.url || "/default.jpg",
    productName: product?.productName,
    price: product?.price,
    stockQuantity: product?.stockQuantity || 0,
    quantity,
  };

  const category = product?.category;
  const {
    data: relatedProducts,
    isLoading: loadingRelated,
  } = useGetProductByCategoryQuery(category, {
    skip: !category,
  });

  const handleBuyNow = () => {
   const buynow = dispatch(addToCart(cartItems));
   if(buynow.payload.stockQuantity>0){
      toast.success("checkout the product")
     }
    navigate("/checkout");
  };
  const handleCart = () => {
     const cart = dispatch(addToCart(cartItems));
     if(cart.payload.stockQuantity>0){
      toast.success("product add to cart")
     }
   
  };



  if (loadingProduct) return <div className="text-center p-4">Loading product...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error loading product</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* PRODUCT DISPLAY */}
      <div className="bg-gray-200 shadow-lg rounded-lg p-4 md:flex gap-6">
        {/* IMAGE SLIDER */}
        <div className="md:w-1/2 ">
      <div className=" flex mx-auto text-center  ">
       {
        
         <div   className="mx-auto"> 
          <ProductDetailsImage  images={images}  />
         </div>
  
         }
      </div>
        </div>
        {/* DETAILS */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-neutral-800">{product?.productName}</h1>
          <p className="text-2xl text-green-700 font-bold">৳{product?.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500">Category: {product?.category}</p>
          <p className="text-sm text-gray-500">{product?.stockQuantity>0 ? <p className="text-blue-600">In Stock</p> : <p className="text-red-500">Out of Stock</p>}</p>
      <div className="flex items-center gap-2">
            <span className="text-sm">Quantity:</span>
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-2 py-1 bg-gray-300 rounded"
            >
              - 
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => {
                if (quantity < product?.stockQuantity) {
                  setQuantity((prev) => prev + 1);
                }
              }}
              className="px-2 py-1 bg-gray-300 rounded"
            >
              +
            </button>
            <span className="text-xs text-gray-500 ml-2">
              (Available: {product?.stockQuantity})
            </span>
          </div>
          {/* Dynamic Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-xl ${i < product?.avarageratings ? "text-yellow-400" : "text-gray-300"}`}>
                ★
              </span>
            ))}
            <span className="text-sm text-gray-500 ml-2">({product?.avarageratings || 0})</span>
          </div>
          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-4">
           {
            product?.stockQuantity === 0?<> <button disabled
              className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={handleCart}
            >
              Add to Cart
            </button></>:<><button
              className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={handleCart}
            >
              Add to Cart
            </button></>
           }
           {
            product?.stockQuantity === 0?<> <button
            disabled
              className="btn bg-green-600 text-white hover:bg-green-700"
              onClick={handleBuyNow}
            >
              Buy Now
            </button></>:<>
             <button
              className="btn bg-green-600 text-white hover:bg-green-700"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            </>
           }
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-neutral-800">
        More from: {product?.category}
      </h2>
      {loadingRelated ? (
        <div className="text-center">Loading related products...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts?.data.map((p: any) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <img
                src={p.images?.find((img: any) => img.isMain)?.url || "/default.jpg"}
                alt={p.productName}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{p.productName}</h3>
              <p className="text-green-600 font-medium">৳{p.price}</p>
              <p className="text-sm text-gray-500">{p.category}</p>
              <Link
                to={`/products/${p._id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <div>
        < ProductReviews productId={id}/>
      </div>
    </div>
  );
};

export default ProductDetails;
