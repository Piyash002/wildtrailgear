/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm,  type SubmitHandler } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../../redux/features/auth/authApi/authApi";
type Inputs = {
  name: string,
  email: string,
  password: string,
  autoLogin?: boolean,
};
const Registration = () => {
      const { register, handleSubmit } = useForm<Inputs>();
      const [registerUser] = useRegisterMutation();
      const navigate = useNavigate();
        const onRegister:SubmitHandler<Inputs> = async (data) => {
           try {
       const res = await registerUser(data).unwrap();
       toast.success(res.message || "Registered successfully!");
      setTimeout(() => navigate("/login"), 1000);
  } catch (error: any) {
    toast.error(error.data.message); 
  }};

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
            <div className=" h-12 w-16  mx-auto"><img src="ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="Logo" />
            </div>
            {/* title */}
            <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
               <p className="lg:text-2xl text-xl font-body">Create an acount</p>
            </div>
            {/* form */}
           <form   className="w-full px-4  gap-y-4" action="" onSubmit={handleSubmit(onRegister)}>
            <div className="mb-2">
                <label htmlFor="Name" className="font-body">Name</label><br />
                <input {...register("name")} className=" rounded w-full px-3 py-1 " type="text" name="name" id="name" placeholder="enter your name"  />
            </div>
            <div>
                <label htmlFor="email" className="font-body">Email</label><br />
                <input {...register("email")} className=" rounded w-full px-3 py-1" type="email" name="email" id="email" placeholder="enter your email"  />
            </div>
            <div className="mt-2">
                <label htmlFor="password">Password</label><br />
                <input {...register("password")} className=" rounded w-full px-3 py-1" type="password" name="password" id="password" placeholder="enter your password"  />
            </div>
             {/* <div className="mt-2">
                  <input {...register("autoLogin")} type="checkbox" id="autoLogin" name="autoLogin" /> Registration with login
             </div> */}
            <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                <input  className="text-center mx-auto items-center text-white " type="submit" value="Register" />
            </div>
           </form>
           <p className="text-center mt-4">Already have an account? Please <NavLink className='underline text-blue-700' to={'/login'}>Sign in</NavLink> </p>
        </div>
      </div>
       <div className="text-center">
        </div>
        
        </div>
    );
};

export default Registration;