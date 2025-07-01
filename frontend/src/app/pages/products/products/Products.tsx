import { useState } from "react";
import ProductsCard from "../../../component/user/ProductsCard";
import SearchProduct from "../../../component/user/SearchProduct";
import Sidebar from "../../../component/user/Sidebar";
import { useGetallProductQuery } from "../../../redux/features/product/productAPi/productApi";
import SmalSidebar from "../../../component/user/SmalSidebar";
import Pagination from './../../../component/user/Pagination';
const Products = () => {
   const [queryParams, setQueryParams] = useState({
    search: "",
    category: "",
    price: "",
    ratings: "",
    producatName:'',
    page: "1",     
    limit: "10", 
  });
    const handleFilters = (filters: { category?: string; price?: string; ratings?: string }) => {
    setQueryParams((prev) => ({ ...prev, ...filters }));
  };
  const handleSearch = (value: string) => {
    setQueryParams((prev) => ({ ...prev, search: value }));
  };
 const handlePageChange = (newPage: number) => {
  setQueryParams((prev) => ({ ...prev, page: newPage.toString() }));
};
  const { data: response, isLoading } = useGetallProductQuery(queryParams);
  const products = response?.data?.result??[]
  const totalPage = response?.data?.totalPage || 1;
  const currentPage = parseInt(queryParams.page);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="">
      {/* search and small sidebar */}
        <div className="mt-2  mx-auto w-full">
            <SearchProduct onSearch= {handleSearch} />
               <div className="lg:hidden block   col-span-1 ">
          <div className="px-4 -mb-3 mt-2">
          <SmalSidebar onFilterChange={handleFilters} />
        </div>
        </div>
        </div>
        {/* sideabr and product card */}
        <div className=" grid lg:grid-cols-5 grid-cols-4  gap-x-4 lg:p-6">
      <div className="col-span-1">
        <Sidebar onFilterChange={handleFilters}/>
        </div>
        <div className="col-span-4 p-4 ">
      <ProductsCard products={products}/>
      </div>
        </div>
        {/* pagination */}
       <div className="mx-auto text-center">
        <Pagination currentPage={currentPage} 
        onPageChange={handlePageChange} totalPage={totalPage}/>
      </div>
    </div>
  );
};

export default Products;
