import { NavLink } from "react-router";
import UserDropDwon from "../../../utils/UserDropDwon";
import { useAppSelector } from "../../../redux/Hooks";
import { FiLogIn } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
const Header = () => {
      const user = useAppSelector((state) => state.auth.user) as { role?: string } | null;
      const cartLength = useAppSelector((state) => state.cart.items.length) as number;
    return (
        <div className="flex justify-between   mx-4 lg:mx-12 ">
          <div >
            <NavLink to={'/'}>
           <div className="flex justify-center items-center my-2 ">
            <img className="w-8 "  src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="" />
            <h1 className="text-primary lg:text-lg sm:text-base   font-brand" >WildTrail Gear</h1>
           </div> 
          </NavLink>
          </div>
          <div className=" flex justify-center items-center lg:gap-x-8 gap-2">
           <NavLink to={"/cart"}>
            <div className="relative bg-secondary p-3 rounded-full bg-opacity-85 "> 
              <h1 className=" absolute -top-1 right-1 tex-lg  rounded-full bg-opacity-85  text-white p-1   ">{cartLength}</h1>
             <MdAddShoppingCart className="text-2xl text-white" />
            </div>
           </NavLink>
     {
      user? <UserDropDwon/>:<NavLink className=" btn btn-outline  rounded  text-secondary hover:bg-primary  flex justify-center items-center lg:px-3 px-2 py-2 gap-x-1 lg:text-md text-base " to={"/login"}>Login <FiLogIn /></NavLink>
     }
          </div>
        </div>
    );
};
export default Header;