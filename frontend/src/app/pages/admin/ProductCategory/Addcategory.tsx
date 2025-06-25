import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateCategoryMutation } from "../../../redux/features/category/categoryApi/categoryApi";

const Addcategory = () => {
    // for react-hook-form
 type TcategoryForm = {
  categoryName: string;
  image: FileList;
};
const { register, handleSubmit,  } = useForm<TcategoryForm>();
const  [createCategory] = useCreateCategoryMutation()
const onSubmit = async (data: TcategoryForm) => {
  const formData:FormData = new FormData();

  try {                       
    formData.append("categoryName", data.categoryName || "");
  if (data.image && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }
    const res = await createCategory(formData).unwrap();
  if(res.success=== true){
        toast.success(res.message || "category created successfully");
  }
  } catch (err) {
    console.error("Error:", err);
  }
};

    return (
        <div>
             <div  className=" justify-center items-center  backdrop:blur-sm bg-slate-200 rounded-lg shadow-lg mx-auto lg:w-96 w-11/12 my-auto  lg:mt-52 mt-24 p-4 ">
         {/* logo */}
            <div className=" h-12 w-16  mx-auto"><img src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="Logo" />
            </div>
            {/* title */}
            <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
               <p className="lg:text-2xl text-xl font-body">Product Category</p>
            </div>
            {/* form */}
           <form   className="w-full px-4  gap-y-4" action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
                <label htmlFor="Name" className="font-body">Category</label><br />
                <input {...register("categoryName")} className=" rounded w-full px-3 py-1 " type="text" name="category Name" id="name" placeholder="Enter Category "  />
            </div>
            <div className="mt-2">
                <label htmlFor="password">Image</label><br />
                <input type="file" {...register("image")} />
            </div>
            
            <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                <input  className="text-center mx-auto items-center text-white " type="submit" value="Submit" />
            </div>
           </form>
           
        </div>
        </div>
    );
};

export default Addcategory;