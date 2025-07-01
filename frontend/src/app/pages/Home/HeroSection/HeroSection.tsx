import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';


const HeroSection = () => {
  return (
  <>
 <div className=''>
       <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500, // 2.5 seconds
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src="/Green and Yellow Simple Clean Shoes Sale Banner.jpg" alt=""  /></SwiperSlide>
        <SwiperSlide><img src="/Green and White Nature Illustrative Simple New Product Sale Banner (1).png" alt=""  /></SwiperSlide>
       
   
      </Swiper>
 </div>
    </>

  );
};

export default HeroSection;
