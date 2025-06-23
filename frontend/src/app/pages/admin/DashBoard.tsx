import { TbUsersGroup } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { FaProductHunt, FaSellsy } from "react-icons/fa6";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi/authApi";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi/categoryApi";
const DashBoard = () => {
     const { data: user } = useGetAllUserQuery(null);
     const { data:category  } = useGetCategoriesQuery(undefined);
        const userdata = user?.data ?? [];
         const lengthOfUser = userdata.length;
             const categorydata = category?.data ?? [];
             const lengthOfCategory = categorydata.length


    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-x-2 px-4  mx-auto mt-4 gap-y-4">
            {/* Total user */}
             <div>
                <div className="bg-gray-200 shadow-md hover:shadow-xl rounded-md border border-gray-300 w-full h-full p-4 mx-auto">
                <TbUsersGroup className="mx-auto text-3xl" />
                <h1 className="mx-auto text-center font-body text-xl">Total user: <span>{lengthOfUser}</span></h1>
                </div>
            </div>
            {/* total category */}
            <div>
                <div className="bg-gray-200 shadow-md hover:shadow-xl rounded-md border border-gray-300 w-full h-full p-4 mx-auto">
                <TbCategoryPlus className="mx-auto text-3xl" />
                <h1 className="mx-auto text-center font-body text-xl">Total Category: <span>{lengthOfCategory}</span></h1>
                </div>
            </div>
            {/* Total product */}
            <div>
                <div className="bg-gray-200 shadow-md hover:shadow-xl rounded-md border border-gray-300 w-full h-full p-4 mx-auto">
                <FaProductHunt className="mx-auto text-3xl" />
                <h1 className="mx-auto text-center font-body text-xl">Total Product: <span>10</span></h1>
                </div>
            </div>
            <div>
                <div className="bg-gray-200 shadow-md hover:shadow-xl rounded-md border border-gray-300 w-full h-full p-4 mx-auto">
                
                <FaSellsy  className="mx-auto text-3xl"/>
                <h1 className="mx-auto text-center font-body text-xl">Total Sell: <span>10</span></h1>
                </div>
            </div>
        </div>
    );
};
export default DashBoard;