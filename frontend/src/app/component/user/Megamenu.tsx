
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi/categoryApi";
import type { Tcategory } from "../../types/types";

const MegaMenu = () => {
  const { data: response } = useGetCategoriesQuery(undefined);
  const categories = response?.data ?? [];

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative group">
      {/* ---------- Desktop Mega Menu ---------- */}
      <div className="hidden md:flex items-center group">
        <div className="flex items-center gap-1 px-4 py-1 text-white  cursor-pointer">
          Categories <IoIosArrowDown className="text-white" />
        </div>

        {/* Dropdown on hover */}
        <div className="absolute top-full  -left-60 hidden group-hover:grid grid-cols-3 gap-4 w-[700px] bg-white text-black shadow-lg p-6 rounded-md z-50">
          {categories.map((cat: Tcategory) => (
            <Link
              key={cat._id}
              to={`/getProductsByCategory/${cat.categoryName}`}
              className="hover:text-primary text-sm font-medium transition"
            >
              {cat.categoryName}
            </Link>
          ))}
        </div>
      </div>

      {/* ---------- Mobile Mega Menu ---------- */}
      <div className="md:hidden px-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex justify-between items-center py-2 text-white font-semibold bg-primary rounded"
        >
          Categories <IoIosArrowDown className={`transform transition ${mobileOpen ? "rotate-180" : ""}`} />
        </button>

        {mobileOpen && (
          <div className="mt-2 bg-white rounded shadow grid grid-cols-2 gap-3 p-4 text-black z-50">
            {categories.map((cat: Tcategory) => (
              <Link
                key={cat._id}
                to={`/getProductsByCategory/${cat.categoryName}`}
                className="hover:text-primary text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {cat.categoryName}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
