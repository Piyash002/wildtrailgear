import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/thumbs"; // Removed because module not found
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

interface Props {
  images: { url: string }[];
}

const ProductImageCarousel = ({ images }: Props) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(images[0]?.url);

  return (
    <div className="w-full">
      {/* Large Main Preview */}
      <div className="w-full border rounded-lg overflow-hidden mb-4">
        <img
          src={activeImage}
          alt="Product"
          className="w-[300px] h-[300px] object-cover transition duration-300"
        />
      </div>

      {/* Thumbnail Carousel */}
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        className="thumb-carousel"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.url}
              onMouseEnter={() => setActiveImage(img.url)}
              onClick={() => setActiveImage(img.url)}
              className={`w-24 h-14 object-fill cursor-pointer rounded border-2 ${
                activeImage === img.url ? "border-primary" : "border-transparent"
              } hover:scale-105 transition`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageCarousel;
