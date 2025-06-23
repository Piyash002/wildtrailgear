// HeroSection.tsx
import { NavLink } from 'react-router';
const HeroSection = () => {
  return (
<div className="relative w-full h-screen overflow-hidden bottom-32 -mb-32  ">
  <video
    autoPlay
    muted
    loop
    className="absolute w-full h-full object-cover z-0"
  >
    <source src="/2894891-uhd_3840_2160_24fps.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center bg-black bg-opacity-5 px-4">
    <h1 className="text-2xl md:text-5xl font-bold text-white">
      Embrace the Wild with WildTrail Gear
    </h1>
    <p className="mt-4 text-sm md:text-xl text-gray-200 max-w-2xl">
      Engineered for explorers. Trusted by adventurers.
    </p>
    <NavLink to={'/products'}>
      <button className="btn mt-6 text-slate-50 font-body border-none bg-secondary hover:bg-primary">Shop Now</button>
    </NavLink>
  </div>
</div>

  );
};

export default HeroSection;
