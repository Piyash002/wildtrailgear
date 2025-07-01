import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi/categoryApi";
import type { Tcategory } from "../../types/types";
type Props = {
  onFilterChange: (filters: { category?: string; price?: string; ratings?: string }) => void;
};
const SmalSidebar = ({onFilterChange}:Props) => {
  const {data:response} = useGetCategoriesQuery();
  const categories = response?.data ?? []; 
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ [e.target.name]: e.target.value });
    };
  const [isModalOpen, setModalOpen] = useState(false);
  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "backdrop") {
      setModalOpen(false);
    }
  };

  return (
    <div>
      {/* ✅ Toggle button */}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-secondary text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <MdOutlineFilterList size={20} />
        Filter
      </button>

      {/* ✅ Modal OUTSIDE the button */}
      {isModalOpen && (
        <div
          id="backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 "
        >
          {/* Sidebar */}
          <div
            className="absolute left-0-0 top-0 h-full w-72 bg-white shadow-lg z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Filter Options</h2>

            {/* Filter content */}
            <div className="space-y-3">
      <select name="category" onChange={handleChange} className="w-full border p-2 rounded">
                    
                     <option value="">All Category</option>
                    {
                     categories.map((category:Tcategory)=>
                     
                     <option value={category.categoryName}>{category.categoryName}</option>
                     )
                    }
             
                   </select>
       <select name="ratings" onChange={handleChange} className="w-full border p-2 rounded">
        <option value="">Any Rating</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>

      <select name="price" onChange={handleChange} className="w-full border p-2 rounded">
        <option value="">All Prices</option>
        <option value="0-10">0–10</option>
        <option value="11-40">11–40</option>
      </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmalSidebar;
