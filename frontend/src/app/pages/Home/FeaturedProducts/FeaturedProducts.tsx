/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Keyboard, Scrollbar, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useGetallProductQuery } from '../../../redux/features/product/productAPi/productApi';
import type { Tproduct } from '../../../types/types';

const FeaturedProducts = () => {
  const { data: response, isLoading } = useGetallProductQuery(null);
  const products = response?.data ?? [];

  if (isLoading) return <p className='text-center mx-auto'>Loading...</p>;

  return (
    <div className="lg:p-6 p-3 bg-white shadow rounded-lg ">
      <h1 className="text-2xl font-bold mb-4 lg:text-start text-center "> Featured Products </h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
        className="mySwiper "
        scrollbar={{ draggable: true }} // Enable draggable scrollbar
      >
        {products.map((product: Tproduct) => {
          const mainImage = product.images.find((img: any) => img.isMain);
          return (
            <SwiperSlide key={product._id} className="flex justify-center">
              <div className="bg-slate-100 rounded-xl shadow-md p-4 w-64 hover:scale-105 duration-300 lg:mx-0 mx-auto ">
                <a href={`/products/${product._id}`}>
                  <img
                    src={mainImage?.url}
                    alt="Product"
                    className="w-full h-36 object-cover rounded-md mb-2"
                  />
                  <h2 className="text-md font-medium text-center">{product.productName}</h2>
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FeaturedProducts;
