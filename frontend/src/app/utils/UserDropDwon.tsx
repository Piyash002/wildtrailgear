/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { logoutUser } from "../redux/features/auth/AuthSlice/AuthSlice";
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineLogout } from "react-icons/hi";
import { useGetSingleUserQuery } from "../redux/features/auth/authApi/authApi";
import { MdOutlineAdminPanelSettings, MdOutlineMarkEmailRead } from "react-icons/md";


const UserDropDwon = () => {
      const user = useAppSelector((state) => state.auth.user) as { role?: string } | null;
  const userState = useAppSelector((state) => state.auth.user) as { id?: string; role?: string } | null;
  const id = userState?.id;
  const { data:Response , isLoading} = useGetSingleUserQuery(id);
  const userData = Response?.data??[]
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dropDownRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const handleClickOuteSide = (e:any)=>{
            if(dropDownRef.current&& !dropDownRef.current.contains(e.target)){
                setIsOpen(false)
            }
        };
document.addEventListener('mousedown', handleClickOuteSide);
return()=>document.removeEventListener('mousedown', handleClickOuteSide)
    }, [])
    const handleLogout = ()=>{
        dispatch(logoutUser());
        navigate('/login')
    }
    if(!user){
        return <button className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition " onClick={()=> navigate('/login')}></button>
    }
if(isLoading){
    return <h1 className="text-xl mx-auto text-center">Loading.....</h1>
}
    return (
        <div className="relative" ref={dropDownRef}>
            
            <div className="avatar">
  <div className="w-10 rounded-full">
    <img src={userData.profileImage} alt="user" className="w-10 h-10 rounded-full cursor-pointer" onClick={()=>setIsOpen(!isOpen)}/>
  </div>
</div>
<AnimatePresence>
    {
        isOpen&&(
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10  font-body"
            >
   <div className=" flex items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-300 gap-x-2">
    <div className="avatar w-6">
    <img src={userData.profileImage} className="" />
    </div>
    <div>
        <p>{userData?.name}</p>
    </div>
   </div>
    <div className="flex items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-300 gap-x-2">
       <div className="bg-slate-300 rounded-full p-1 text-lg">
         <MdOutlineMarkEmailRead className="text-lg" />
       </div>
        <p className="">{userData.email}</p>  
    </div>
    <div className="mt-2">
        {
                user.role === "ADMIN" &&(
                    <button className=" flex items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-300 font-body" onClick={()=>{
                        navigate('/admin')
                        setIsOpen(false)
                    }}>
                    <div className="bg-slate-300 rounded-full p-1 text-lg">
                        <MdOutlineAdminPanelSettings />
                      </div>
                      <div>Switch to Admin</div>
                      
                    </button>
                )
            }
  <button
className=" flex justify-start items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-400 gap-x-2"
                    onClick={handleLogout}
                > 
                  <div  className="bg-slate-300 rounded-full p-1 text-lg">
                      <HiOutlineLogout  />
                  </div>
                    Logout
                </button>
    </div>
            </motion.div>
        )
    }
</AnimatePresence>
            
        </div>
    );
};

export default UserDropDwon;