import { NavLink, useNavigate } from "react-router";
import Header from "../Header/Header";
import { MdAddShoppingCart, MdOutlineAdminPanelSettings } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks";
import { logoutUser } from "../../../redux/features/auth/AuthSlice/AuthSlice";
import { FiLogIn } from "react-icons/fi";
import { TbCategoryPlus } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import {  FaSellsy } from "react-icons/fa6";
import { LiaProductHunt } from "react-icons/lia";
const Navbar = () => {
   const navigate = useNavigate()
      const user = useAppSelector((state) => state.auth.user) as { role?: string } | null;
    const dispath = useAppDispatch()
    const handleLogout = () => {
      dispath(logoutUser());
    }
    return (
        <div className="bg-white bg-opacity-0  px-2 py-2 sticky top-0  z-20 bottom-0 shadow-sm" >
          <Header />
           <div className="  ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className=" dropdown-content bg-gray-200 rounded z-1  w-56  max-h-fit p-2 shadow ">
        <li className="font-brand hover:bg-slate-300 px-2 rounded border border-stone-300  p-1 flex items-center gap-x-2">
            <div> <IoHomeOutline className="mx-auto text-xl" /></div>
            <NavLink to={'/'}>Home</NavLink>
        </li>
        <li className="font-brand hover:bg-slate-300 px-2 rounded mt-2 border border-stone-300 p-1 flex items-center gap-x-2 ">
         <div><LiaProductHunt className="mx-auto text-xl " /></div>
            <NavLink to={'/products'}>Products</NavLink>
        </li>
        <li className="font-brand hover:bg-slate-300 px-2 rounded mt-2 border-stone-300  border p-1 flex items-center gap-x-2">
            <div><TbCategoryPlus className="mx-auto text-xl" /></div>
            <NavLink to={'/categories'}>Category</NavLink>
        </li>
        <li className="font-brand hover:bg-slate-300 px-2 rounded mt-2 border-stone-300  border p-1 flex items-center gap-x-2">
            <div><MdAddShoppingCart className="mx-auto text-xl" /></div>
            <NavLink to={'/cart'}>Cart</NavLink>
        </li>
        <li className="font-brand hover:bg-slate-300 px-2 rounded mt-2 border-stone-300 border p-1 flex items-center gap-x-2">
           <div><FaSellsy  className="mx-auto text-xl"/></div>
               <NavLink to={'/about'}>About Us</NavLink>
        </li>
           <div className="mt-56 w-full px-2 border border-gray-300 py-2 ">
            {
              user?.role === "ADMIN" ?
              <button className=" flex items-center w-full text-left   text-sm  hover:bg-slate-300  rounded font-body mb-2 gap-x-2" onClick={()=>{ navigate('/admin')}}>
                      <div className="bg-slate-300 rounded-full p-1 text-lg   gap-x-3">
                        <MdOutlineAdminPanelSettings />
                          </div>
                          <div>Switch to Admin </div>
                                    
              </button>:<></>
            }
             {
              user? <NavLink className=' mt-3' to="/admin/add-category">
               <li className="">
                 <button
               className=" flex justify-start items-center w-full text-left  text-sm hover:bg-slate-300  rounded gap-x-2" onClick={handleLogout}> 
                <div  className="bg-slate-300 rounded-full p-1 text-lg">
                <HiOutlineLogout  /></div>
                          Logout
                  </button>
                </li>
                
            </NavLink>:<NavLink className=" bg-slate-300 hover:bg-slate-400   flex justify-center items-center p-2 gap-x-1 lg:text-md text-base " to={"/login"}>Login/Registration <FiLogIn /></NavLink>
             }
           </div>
      </ul>
    
    </div>
  </div>
  <div className="hidden lg:flex justify-center  ">
    <ul className=" flex justify-start   gap-x-24 ">
    <li className="font-brand text-slate-800 hover:text-secondary hover:underline rounded-xl p-2">
      <NavLink to={'/'}>Home</NavLink>
    </li>
    <li className="font-brand text-slate-800 hover:text-secondary hover:underline rounded-xl p-2">
      <NavLink to={'/products'}>Products</NavLink>
      </li>
    <li className="font-brand text-slate-800 hover:text-secondary hover:underline  rounded-xl p-2">
       <NavLink to={'/categories'}>Category</NavLink>
      </li>
     <li className="font-brand text-slate-800 hover:text-secondary hover:underline  rounded-xl p-2">
       <NavLink to={'/about'}>About Us</NavLink>
      </li>
    </ul>
  </div>
          </div>  
        </div>
    );
};

export default Navbar;