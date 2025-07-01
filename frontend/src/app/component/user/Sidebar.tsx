import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi/categoryApi";
import type { Tcategory } from "../../types/types";

type Props = {
  onFilterChange: (filters: { category?: string; price?: string; ratings?: string }) => void;
};

const Sidebar = ({onFilterChange}:Props) => {
const {data:response} = useGetCategoriesQuery();
const categories = response?.data ?? []; 
     const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };
    return (
        <div className="hidden sm:block p-4">
            <div className="w-[200px] space-y-3">
      <select name="category" onChange={handleChange} className="w-full border p-2 rounded">
       
        <option value="">All Category</option>
       {
        categories.map((category:Tcategory)=>
        
        <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
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
        <option value="10-40">10–40</option>
      </select>
    </div>
        </div>
    );
};

export default Sidebar;