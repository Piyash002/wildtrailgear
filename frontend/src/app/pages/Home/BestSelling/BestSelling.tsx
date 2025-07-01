/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetSoldProductQuery } from "../../../redux/features/product/productAPi/productApi";
import { FaStar } from "react-icons/fa";

const BestSellingSwiper = () => {
  const navigate = useNavigate();
  const { data: response, error, isLoading } = useGetSoldProductQuery(undefined);
  const bestSelling = response?.data ?? [];

  if (error) {
    const errorMessage =
      (error as any)?.data?.message || (error as any)?.message || "Something went wrong";
    toast.error(errorMessage);
  }

  const goToProductDetails = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <section className=" px-4 py-6 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold  text-center text-gray-800 dark:text-gray-200">
        🔥 Best Selling Products
      </h2>
<h3 className='text-xl  text-center text-gray-800 dark:text-gray-200 mb-4'>Explore the best selling product</h3>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : !bestSelling.length ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {bestSelling.slice(0, 8).map((product: any) => {
            const mainImage = product.images.find((img: any) => img.isMain)?.url || "/placeholder.jpg";
            const rating = Math.round(product.avarageratings || 0);

            return (
              <SwiperSlide key={product._id}>
                <div
                  onClick={() => goToProductDetails(product._id)}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={mainImage}
                    alt={product.productName}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-md font-semibold mt-3 text-gray-800 dark:text-white">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">৳ {product.price}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                    <span className="text-sm text-gray-500">({product.reviews.length})</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Sold: {product.soldCount} pcs
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};

export default BestSellingSwiper;
