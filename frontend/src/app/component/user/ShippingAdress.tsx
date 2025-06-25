import { useForm, type SubmitHandler } from "react-hook-form";
import type { TShippingAdress } from "../../types/types";



const ShippingAdress = () => {
        const {register, handleSubmit} = useForm<TShippingAdress>();
        const onSubmit:SubmitHandler<TShippingAdress>=()=>{

        }
    return (
        <div>
                   <div  className=" justify-center items-center  backdrop:blur-sm bg-slate-200 rounded-lg shadow-lg mx-auto lg:w-96 w-11/12 my-auto lg:mt-10 mt-12  p-4 ">
                     {/* logo */}
                        <div className=" h-12 w-16  mx-auto"><img src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="Logo" />
                        </div>
                        {/* title */}
                        <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
                           <p className="lg:text-2xl text-xl font-body">Add product</p>
                        </div>
                        {/* form */}
                       <form   className="w-full px-4  gap-y-4" action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2">
                            <label htmlFor="Name" className="font-body">Name</label><br />
                            <input {...register("name")} className=" rounded w-full px-3 py-1 " type="text" name="Name" id="productName" placeholder="Enter Your Name"  />
            
                        </div>

                        <div className="mb-2">
                            <label htmlFor="price" className="font-body"> Email</label><br />
                            <input {...register("email")} className=" rounded w-full px-3 py-1 " type="text" name="email" id="price" placeholder="Enter email"  />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="price" className="font-body">Phone</label><br />
                            <input {...register("phone")} className=" rounded w-full px-3 py-1 " type="number" name="phone" id="phone" placeholder="Enter Valid Phone Number"  />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="font-body">Address</label><br />
                            <input {...register("address")} className=" rounded w-full px-3 py-1 " type="text" name="address" id="address" placeholder="Enter address"  />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="font-body">Zila</label><br />
                            <input {...register("zila")} className=" rounded w-full px-3 py-1 " type="text" name="Zila" id="Zila" placeholder="Enter Zila"  />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="font-body">upozila</label><br />
                            <input {...register("upozila")} className=" rounded w-full px-3 py-1 " type="text" name="address" id="upozila" placeholder="Enter upozila"  />
                        </div>
                        <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                            <input  className="text-center mx-auto items-center text-white " type="submit" value="Submit" />
                        </div>
                       </form>
                       
                    </div>
        </div>
    );
};

export default ShippingAdress;