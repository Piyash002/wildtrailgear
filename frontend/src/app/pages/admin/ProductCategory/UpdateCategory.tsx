/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useAppSelector } from "../../../redux/Hooks";
import type { Tcategory } from "../../../types/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import { useDeletecategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi/categoryApi";
const UpdateCategories = () => {
// Ensure user is typed as an object or null, not a string
const user = useAppSelector((state) => state.auth.user as { role?: string } | null);
const { data: response, isLoading, isError, error } = useGetCategoriesQuery(undefined);
const [updateCategory] = useUpdateCategoryMutation();
const [deleteCategory] = useDeletecategoryMutation();
const [isModalOpen, setIsModalOpen] = useState(false);
const [categoryId, setCategoryId] = useState<string>("");
const categories = response?.data ?? []; 
const { register, handleSubmit,  } = useForm<Tcategory>();
 if(isLoading){
  return <h1 className=" text-center text-2xl font-body">Loading .....</h1>
 }
 if (isError) return <p>Error: {(error as any)?.data?.message || "Something went wrong"}</p>;
//edit and delete
const onSubmit = async (data: Tcategory) => {
  const formData:FormData = new FormData();

  try {                       
  if (data.categoryName?.trim()) {
    formData.append("categoryName", data.categoryName);
  }
        if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // Use key = 'image'
    }
    const res = await updateCategory({ formData, id: categoryId }).unwrap();
  if(res.success=== true){
        toast.success(res.message || "category created successfully");
  }
  } catch (err) {
    console.error("Error:", err);
  }
};
    const handleEdit = (category:any) => {
    setIsModalOpen(true);
    setCategoryId(category._id as string);
  };
 const handledelete = async (id: string) => {
      await deleteCategory(id);
 }
 const handleModalClose =()=>{
setIsModalOpen(false)
 }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 ">
        {categories &&
          categories.map((category: Tcategory) => (
            <div
              key={category._id}
              className="p-2 bg-slate-300 border rounded shadow hover:shadow-lg hover:bg-slate-500 transition"
            >
              <div className="relative h-28 w-full overflow-hidden rounded mb-3">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.categoryName}
                    className="w-screen h-full object-cover "
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <p className="text-center text-lg font-semibold">
                {category.categoryName}
              </p>
            {
              user && user.role === "ADMIN" ? (
                <div className="text-2xl  text-center gap-x-3 bg-gray-200">
                  <button onClick={()=>handleEdit(category)} className=" font-body text-2xl text-green-500 rounded"><CiEdit /></button>
                  <button onClick={() => handledelete(category._id)} className=" font-body text-2xl text-red-500 rounded"><MdDeleteOutline /></button>
                </div>
              ) : null
            }
            </div>
          ))}
      </div>
        {
              isModalOpen&& (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-md min-w-[300px]">
            <button className="text-2xl" onClick={handleModalClose}><IoIosClose /></button>
 <div  className=" justify-center items-center  backdrop:blur-sm bg-slate-200 rounded-lg shadow-lg mx-auto lg:w-96 w-11/12 my-auto   p-4 ">
         {/* logo */}
            <div className=" h-12 w-16  mx-auto"><img src="/public/ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="Logo" />
            </div>
            {/* title */}
            <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
               <p className="lg:text-2xl text-xl font-body">Update Product category</p>
            </div>
            {/* form */}
           <form   className="w-full px-4  gap-y-4" action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
                <label htmlFor="Name" className="font-body">categoryName</label><br />
                <input {...register("categoryName")} className=" rounded w-full px-3 py-1 " type="text" name="categoryName" id="name" placeholder="enter categoryName"  />
            </div>
            <div className="mt-2">
                <label htmlFor="password">image</label><br />
                      <input type="file" {...register("image")} />
            </div>
            
            <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                <input  className="text-center mx-auto items-center text-white " type="submit" value="Submit" />
            </div>
           </form>
           
        </div>
        
          </div>
        </div>
      )
            }
    </div>
  );
};

export default UpdateCategories;
