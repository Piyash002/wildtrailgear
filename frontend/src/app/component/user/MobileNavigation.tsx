/* eslint-disable @typescript-eslint/no-explicit-any */
// import { FaSellsy } from "react-icons/fa6";
// import { FiLogIn } from "react-icons/fi";
// import { HiOutlineLogout } from "react-icons/hi";
// import { IoHomeOutline } from "react-icons/io5";
// import { LiaProductHunt } from "react-icons/lia";
// import { MdAddShoppingCart, MdOutlineAdminPanelSettings } from "react-icons/md";
// import { TbCategoryPlus } from "react-icons/tb";
// import { NavLink, useNavigate } from "react-router";
// import { logoutUser } from "../../redux/features/auth/AuthSlice/AuthSlice";
// import { useAppSelector, useAppDispatch } from "../../redux/Hooks";

// import { useState, useEffect } from "react";
// // import SearchItem from "./SearchItem";
// import { useAppSelector, useAppDispatch } from "../../redux/Hooks";
// import { logoutUser } from "../../redux/features/auth/AuthSlice/AuthSlice";
// import { RiAccountCircleFill } from "react-icons/ri";
// import { NavLink } from "react-router-dom";
import MegaMenu from "./Megamenu";

const MobileNavigation= ({setIsMobileMenuOpen}:any) => {
    //  const user = useAppSelector((state) => state.auth.user) as { id?: string } | null;
    //   const dispath = useAppDispatch()
  //     const handleLogout = () => {
  //       dispath(logoutUser());
  //     }
  // const [searchValue, setSearchValue] = useState("");
  //   const [queryParams, setQueryParams] = useState({ search: "" });
  //   useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setQueryParams({ search: searchValue });
  //   }, 100);
  //   return () => clearTimeout(timer);
  // }, [searchValue]);
  
    // const navigate = useNavigate()
    //   const user = useAppSelector((state) => state.auth.user) as { role?: string } | null;
    // const dispath = useAppDispatch()
    // const handleLogout = () => {
    //   dispath(logoutUser());
    // }
    return (
        <div>
         <ul className="space-y-1">
                {/* <li className="block px-4 py-2 ">
                 <input  
           onChange={(e) => setSearchValue(e.target.value)}
           placeholder="Search..." className=" rounded  p-1  shadow-lg"       type="text" 
              
             
              />
            {
       searchValue && (
       <div className=" absolute inset-14">
         <SearchItem queryParams={queryParams}  setSearchValue={(val:any) => {
              setSearchValue(val);
              setIsMobileMenuOpen(false)

            }} />
       </div>
      
      )}

                </li> */}
                <li>
                  <a
                    href="/"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                </li>
           
                <li>
                  <a
                    href="/products"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a className="block  text-white rounded-md transition-colors">
                   <MegaMenu/>
                  </a>
                </li>
                <li>
                  <a
                    href="/orders"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
               Login
                  </a>
                </li>

              </ul>
        </div>
    );
};

export default MobileNavigation;

