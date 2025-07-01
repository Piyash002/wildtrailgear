/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import { useGetallProductQuery } from "../../redux/features/product/productAPi/productApi";

const SearchItem = ({queryParams,SetModalOpen,setSearchValue}:any) => {
       const { data: response, isLoading } = useGetallProductQuery(queryParams);
       const products = response?.data?.result ?? [];
       const navigator= useNavigate();
    return (
        <div>
              <div  className="absolute  backdrop-blur-2xl bg-white/30 p-4 rounded-lg text-black z-60 max-h-60 overflow-auto right-0  bg-opacity-5 w-full">
      {
        isLoading?(<div>Loading....</div>):products.length === 0?(<div className="p-2 text-center text-sm text-gray-400">No products found</div>):(products.map((product:any)=>(
          <div key={product._id}  onClick={() => {
                     navigator(`/products/${product._id}`);
                      setSearchValue("");        
                      SetModalOpen(false);  
                     
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                {product.productName}
               </div>
            )))}
       </div>
        </div>
    );
};

export default SearchItem;