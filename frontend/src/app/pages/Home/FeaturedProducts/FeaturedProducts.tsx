/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Keyboard, Scrollbar, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useGetallProductQuery } from '../../../redux/features/product/productAPi/productApi';
import type { Tproduct } from '../../../types/types';
import HeaderTitle from '../../../component/user/HeaderTitle';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { data: response, isLoading } = useGetallProductQuery(null);
  const products = response?.data?.result?.slice(0, 8) ?? []; // Only 8 products

  if (isLoading) return <p className="text-center mx-auto">Loading...</p>;

  return (
    <div className="lg:p-6 p-3 bg-white shadow rounded-lg">
      <HeaderTitle header="🔥 Featured Products" title="Check & Get Your Desired Product!" />
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        keyboard={{ enabled: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          2048: { slidesPerView: 5 },
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
        className="mySwiper"
        scrollbar={{ draggable: true }}
      >
        {products.map((product: Tproduct) => {
          const mainImage = product.images?.find((img: any) => img.isMain);
          const rating = Math.round(product.avarageratings || 0);

          return (
            <SwiperSlide key={product._id} className="flex justify-center">
              <Link to={`/products/${product._id}`}>
                <div className="bg-slate-100 rounded-xl shadow-md p-4 w-72 hover:scale-105 duration-300">
                  <img
                    src={mainImage?.url || '/placeholder.jpg'}
                    alt={product.productName}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />

                  <h2 className="text-md font-semibold text-gray-800 dark:text-white text-center">
                    {product.productName.slice(0, 30)}
                  </h2>

                  <div className="flex justify-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews?.length || 0})
                    </span>
                  </div>

                  {/* <p className="text-center text-green-700 font-semibold mt-2 text-lg">
                    ৳ {product.price}
                  </p> */}

                  {/* <p className="text-xs text-center text-gray-500">
                    {product.stockQuantity > 0
                      ? `In stock: ${product.stockQuantity}`
                      : 'Out of stock'}
                  </p> */}

                  {/* {product.soldCount > 10 && (
                    <p className="text-center text-orange-500 text-xs mt-1 font-medium">
                      ✅ {product.soldCount}+ units sold
                    </p>
                  )} */}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
