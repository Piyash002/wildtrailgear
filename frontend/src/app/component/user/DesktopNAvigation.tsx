/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink} from "react-router-dom";
import Cart from "./Cart";
import {  useEffect, useRef, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import SearchItem from "./SearchItem";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { logoutUser } from "../../redux/features/auth/AuthSlice/AuthSlice";
import MegaMenu from "./Megamenu";


const Navigation = () => {
      const user = useAppSelector((state) => state.auth.user) as { id?: string } | null;
    const dispath = useAppDispatch()
    const handleLogout = () => {
      dispath(logoutUser());
    }
const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        SetModalOpen(false);
      }
    };

     document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [searchValue, setSearchValue] = useState("");
  const [queryParams, setQueryParams] = useState({ search: "" });
  useEffect(() => {
  const timer = setTimeout(() => {
    setQueryParams({ search: searchValue });
  }, 100);
  return () => clearTimeout(timer);
}, [searchValue]);

  const [modalOpen, SetModalOpen ] = useState(false)
  const handleModalOpen = ()=>{
    SetModalOpen(!modalOpen)
  }
  return (
    <nav className="flex items-center justify-between max-w-[1230px] mx-auto p-2  ">
      {/* Brand/Logo */}
      <div className="flex-shrink-0">
        <NavLink 
          to="/" 
          className="font-bold text-xl text-white hover:text-gray-200 transition-colors duration-200"
        >
          WildTrail Gear
        </NavLink>
      </div>
      {/* Navigation Links */}
      <ul className="flex items-center space-x-1">
        <li>
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/products" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
            Products
          </NavLink>
        </li>
        <li>
        
            <MegaMenu/>
         
        </li>
        <li>
          <NavLink 
            to="/order" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
            Orders
          </NavLink>
        </li>
        
        <li>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              `font-body px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`
            }
          >
            About Us
          </NavLink>
        </li>
       
        <li onClick={handleModalOpen} className=" text-white/90">
    <input autoFocus className=" text-black border-none 
         p-2 w-72  " type="text" 
         onKeyDown={(e) => {
         if (e.key === "Enter" && searchValue.trim()) {
          SetModalOpen(false);
    
       }
       }}
         onChange={(e) => setSearchValue(e.target.value)}
         placeholder="Search your keyword..."
         
       />
        {
       searchValue && (
      <SearchItem queryParams={queryParams}  setSearchValue={(val:any) => {
              setSearchValue(val);
              SetModalOpen(false);
            }} />
      
      )}

        </li >
         <li className="px-4 ">
          <Cart />
        </li>
        <li >
          <div className="  text-white font-bold ">
                 {
                  user?<><li className="btn btn-outline  px-2 hover:bg-secondary bg-opacity-15" onClick={handleLogout}>Logout</li></>:<NavLink className="text-3xl" to={"/login"}><RiAccountCircleFill /></NavLink>
                 }
               
                   </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;