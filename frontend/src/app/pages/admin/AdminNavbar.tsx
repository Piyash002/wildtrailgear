
import { HiOutlineLogout } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { logoutUser } from "../../redux/features/auth/AuthSlice/AuthSlice";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
const AdminNavbar = () => {
 const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth.user) as { role?: string } | null;
  const dispath = useAppDispatch()
  const handleLogout = () => {
    dispath(logoutUser());
  }
    return (
        <div className="w-full  px-2 py-2 sticky top-0  z-20 bottom-0  ">
           <div className="navbar bg-opacity-0 bg-white shadow-lg relative z-30  mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <div className="h-auto">
        <ul
        tabIndex={0}
        className=" gap-y-24 my-24 dropdown-content bg-base-100 rounded z-1 mt-3 w-52 p-2 shadow min-h-full px-2  bg-slate-200  ">
        <NavLink to="/admin"><li className="hover:bg-slate-300 px-2 rounded ">Dashboard</li></NavLink>
         <NavLink to="/admin/get-all_User" ><li className="hover:bg-slate-300 px-2 rounded ">Get All User</li></NavLink>
        <details>
        <summary className="hover:bg-slate-300 px-2 rounded "> 
          Category
        </summary>
        <ul className="pl-4">
             <li className="hover:bg-slate-300 px-2 rounded " >
              <NavLink to="/admin/add-category">Add Category</NavLink>
                </li>
                <li className="hover:bg-slate-300 px-2 rounded " >
              <NavLink to="/admin/get_all_categories">Get All Categories</NavLink>
                </li>
        </ul>
          </details>
         <details>
        <summary className="hover:bg-slate-300 px-2 rounded ">Products</summary>
        <ul className="pl-4">
          <li className="hover:bg-slate-300 px-2 rounded ">
              <NavLink to="/admin/add-product">Add Product</NavLink>
          </li>
            <li className="hover:bg-slate-300 px-2 rounded ">
         <NavLink to="/admin/get-all-products">Get All products</NavLink>
                    </li>
                  </ul>
          </details>
    
     <div className="mt-64 w-full px-2 border border-gray-300 py-2 ">
      {
        user?.role === "ADMIN" ?
        <button className=" flex items-center w-full text-left   text-sm  hover:bg-slate-300  rounded font-body mb-2 gap-x-2" onClick={()=>{ navigate('/')}}>
                <div className="bg-slate-300 rounded-full p-1 text-lg   gap-x-3">
                  <MdOutlineAdminPanelSettings />
                    </div>
                    <div>Switch to User </div>
                              
        </button>:<></>
      }
        <NavLink className=' mt-3' to="/admin/add-category">
         <li className="">
           <button
         className=" flex justify-start items-center w-full text-left  text-sm hover:bg-slate-300  rounded gap-x-2" onClick={handleLogout}> 
          <div  className="bg-slate-300 rounded-full p-1 text-lg">
          <HiOutlineLogout  /></div>
                    Logout
            </button>
          </li>
          
      </NavLink>
     </div>
      </ul>
      </div>
    </div>
  </div>
  <div className="navbar-center">
    <img src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png" className="w-12 text-primary font-body"/>
    <p className="text-xl text-primary font-brand">WildTrail Gear</p>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button>

  
  </div>
  </div>
</div>
    );
};

export default AdminNavbar;