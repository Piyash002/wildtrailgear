
import HeroSection from "../HeroSection/HeroSection";
// import BestSelling from "../BestSelling/BestSelling";
import Categories from "../Categories/Categories";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import Faq from "../FAQ Section/Faq";
import NewsLater from "../NewsLater/NewsLater";
import BestSelling from "../BestSelling/BestSelling";

const Home = () => {
    return (
        <div className="">
         
            <HeroSection />
            <BestSelling/>
             <Categories/>
            <FeaturedProducts/>

            <Faq/>
             <NewsLater/>
            

        </div>
    );
};

export default Home;