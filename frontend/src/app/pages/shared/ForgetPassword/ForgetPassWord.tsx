import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router";

const ForgetPassWord = () => {
    return (
        <div>
                <div className="">
                <div className="">
             <div className="text-center py-2 rounded-lg   lg:w-1/12  w-2/5 bg-slate-100 flex justify-center items-center gap-x-2 mx-2 my-2  ">
               <IoMdArrowRoundBack className=" text-xl" />
              <NavLink className='' to={'/login'}>
              <div className="text-lg font-body">Back</div>
              </NavLink>
              </div>
                <div  className=" justify-center items-center  backdrop:blur-sm bg-slate-200 rounded-lg shadow-lg mx-auto lg:w-96 w-11/12 my-auto  lg:mt-52 mt-24 p-4 ">
               {/* logo */}
                  <div className=" h-12 w-16  mx-auto"><img src="/public/ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="Logo" />
                  </div>
                  {/* title */}
                  <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
                     <p className="lg:text-2xl text-xl font-body"> Forget password</p>
                  </div>
                  {/* form */}
                 <form className=" w-full px-4  gap-y-4" action="">
                  <div>
                      <label htmlFor="email" className="font-body">Email</label><br />
                      <input className=" rounded w-full px-3 py-1" type="email" name="email" id="email" placeholder="enter your email" />
                  </div>
            
                  <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                      <button className="text-center mx-auto items-center text-white " type="submit">Submit</button>
                  </div>
                 </form>
              </div>
            </div>
              </div>
        </div>
    );
};

export default ForgetPassWord;