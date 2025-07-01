
import type { Tcategory } from "../../../types/types";
import {  useGetCategoriesQuery} from "../../../redux/features/category/categoryApi/categoryApi";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../component/user/HeaderTitle";
const Categories = () => {
const { data: response } = useGetCategoriesQuery(undefined);
const categories = response?.data ?? []; 

  return (
    <div className="lg:p-6 p-2 mt-2 ">
     <HeaderTitle header="Featured Categories" title="Get Your Desired Product from Featured Category!"/>
      <div className="grid grid-cols-2 md:grid-cols-6  ">
        {categories &&
          categories.map((category: Tcategory) => (
       <Link to={`/getProductsByCategory/${category.categoryName}`} key={category._id}>
          <div className="p-2 border  shadow hover:shadow-gray-200 transition-transform hover:scale-100 bg-gray-100">

            <div className="relative h-28 w-full overflow-hidden rounded mb-3">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.categoryName}
                  className="w-screen h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <p className="text-center text-mg font-semibold">
              {category.categoryName}
            </p>
          
          </div>
      </Link>
          ))}
      </div>
     
    </div>
  );

};


export default Categories;
