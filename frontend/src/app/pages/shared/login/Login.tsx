/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/Hooks";
import { setUser } from "../../../redux/features/auth/AuthSlice/AuthSlice";
import { verifyToken } from "../../../component/verifToken/VerifyToken";
import type { JwtPayload } from "jwt-decode";
import { useLoginMutation } from "../../../redux/features/auth/authApi/authApi";
interface Tlogin {
  email: string;
  password: string;
}
interface DecodedUser extends JwtPayload {
  role?: string;
}
const Login = () => {

 const [loginUser] = useLoginMutation();
 const navigate = useNavigate();
 const { register, handleSubmit } = useForm<Tlogin>({
  defaultValues: {
    email: "piyash007@gmail.com", 
    password: "12345678",       
  },
});
 const dispatch = useAppDispatch();
 const handleLogin  = async (data: Tlogin) => {
   try {
     const res = await loginUser(data).unwrap();
     toast.success(res.message || "Logged in successfully!");
     const user = verifyToken(res.data) as DecodedUser;
     console.log("user=>", user)
    dispatch(setUser({user:user , token:res.data}))
    if (user.role  === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/products");
    }
   } catch (error: any) {
     toast.error(error.data.message);
   }
 };
    return (
        <div className="">
                <div className="">
             <div className="text-center py-2 rounded-lg   lg:w-1/12  w-2/5 bg-slate-100 flex justify-center items-center gap-x-2 mx-2 my-2  ">
               <IoMdArrowRoundBack className=" text-xl" />
              <NavLink className='' to={'/'}>
              <div className="text-lg font-body">Back</div>
              </NavLink>
              </div>
                <div  className=" justify-center items-center  backdrop:blur-sm bg-slate-200 rounded-lg shadow-lg mx-auto lg:w-96 w-11/12 my-auto  lg:mt-52 mt-24 p-4 ">
               {/* logo */}
                  <div className=" h-12 w-16  mx-auto"><img src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="Logo" />
                  </div>
                  {/* title */}
                  <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
                     <p className="lg:text-2xl text-xl font-body"> Sign In</p>
                  </div>
                  {/* form */}
                 <form onSubmit ={handleSubmit(handleLogin)} className=" w-full px-4  gap-y-4" action="">
                  <div>
                      <label htmlFor="email" className="font-body">Email</label><br />
                      <input {...register("email")} className=" rounded w-full px-3 py-1" type="email" name="email" id="email" placeholder="enter your email" />
                  </div>
                  <div className="mt-2">
                      <label htmlFor="password">Password</label><br />
                      <input {...register("password")} className=" rounded w-full px-3 py-1" type="password" name="password" id="password" placeholder="enter your password"  />
                  </div>
                   <div className="mt-2">
                   <NavLink to={'/forgetpassword'}>
                       <p className="underline  font-body text-end">Forget your password?</p>
                   </NavLink>
                   </div>
                  <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                      <button className="text-center mx-auto items-center text-white " type="submit">Login</button>
                  </div>
                 </form>
                 <p className="text-center mt-4">Don't have an account? Please <NavLink className='underline text-blue-700' to={'/registartion'}>Registration</NavLink> </p>
              </div>
            </div>
              </div>
    );
};

export default Login;