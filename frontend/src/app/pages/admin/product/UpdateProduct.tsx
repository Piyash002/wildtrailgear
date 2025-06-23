/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteProductMutation, useGetallProductQuery, useUpdateProductMutation } from "../../../redux/features/product/productAPi/productApi";
import { CiEdit } from "react-icons/ci";
import { useAppSelector } from "../../../redux/Hooks";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Tproduct } from "../../../types/types";
import toast from "react-hot-toast";
const UpdateProduct = () => {
  // API call
  const user = useAppSelector((state) => state.auth.user as { role?: string } | null);
  const { data: response, isLoading } = useGetallProductQuery(null);
  const [deleteProduct] = useDeleteProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const products = response?.data ?? [];
  // sate handling
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState<string|null>(null);
  const { register, handleSubmit,  } = useForm<Tproduct>();

  // submit handleer
    const handleEdit = (data:any) => {
    setIsModalOpen(true);
    setProductId(data._id)
    
  };
 const handledelete = async (id: string) => {
  console.log(id)
      const res = await deleteProduct({id}).unwrap()
       if(res.success=== true){
         toast.success(res.message || "product delete successfully");
   }
      
 }
const handleModalClose =()=>{
setIsModalOpen(false)
 }
 const onSubmit = async (data: Tproduct) => {
   const formData:FormData = new FormData();
   try {
     if (data.category?.trim()) {
       formData.append("category", data?.category);
     }
     if (data.productName) {
       formData.append("productName", data?.productName);
     }
     if (data?.stockQuantity) {
       formData.append("stockQuantity", data?.stockQuantity.toString())
     }
     if (data?.price) {
       formData.append("price", data?.price.toString())
     }
     const res = await updateProduct({ formData, id:productId }).unwrap();
     console.log(res)
   if(res.success=== true){
         toast.success(res.message || "product update successfully");
   }
   } catch (err) {
     console.error("Error:", err);
   }
 };
  if (isLoading) return <p>Loading...</p>;
    return (
        <div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product: any) => {
        const mainImage = product.images.find((img: any) => img.isMain);

        return (
          <div key={product._id} className="border p-2 rounded shadow">
            <img
              src={mainImage?.url || "/default.jpg"}
              alt={product.productName}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.productName}</h2>
            <p className="text-gray-600">TK {product.price}</p>
            <p className="text-sm">{product.category}</p>
            <a
              href={`/products/${product._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </a>
            {
                  user && user.role === "ADMIN" ? (
                  <div className="text-2xl  text-center gap-x-3 bg-gray-200">
                              <button onClick={()=>handleEdit(product)} className=" font-body text-2xl text-green-500 rounded"><CiEdit /></button>
                              <button onClick={() => handledelete(product._id)} className=" font-body text-2xl text-red-500 rounded"><MdDeleteOutline /></button>
                            </div>
                          ) : null
                        }
  
          </div>
        );
      })}
    </div>
    {
      isModalOpen&&(
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                     <div  className=" justify-center items-center  backdrop:blur-sm bg-slate-200 rounded-lg shadow-lg mx-auto lg:w-96 w-11/12 my-auto  lg:mt-24 mt-10 p-4 ">
                     <button className="text-mg p-2" onClick={handleModalClose}><IoIosClose/></button>
                          {/* logo */}
                             <div className=" h-12 w-16  mx-auto"><img src="/public/ChatGPT Image May 23, 2025, 08_34_29 AM.png" alt="Logo" />
                             </div>
                             {/* title */}
                             <div className="mx-auto text-center flex items-center justify-center gap-x-16 mt-4 mb-4">
                                <p className="lg:text-2xl text-xl font-body">Add product</p>
                             </div>
                             {/* form */}
                            <form   className="w-full px-4  gap-y-4" action="" onSubmit={handleSubmit(onSubmit)}>
                             <div className="mb-2">
                                 <label htmlFor="productName" className="font-body">productName</label><br />
                                 <input {...register("productName")} className=" rounded w-full px-3 py-1 " type="text" name="productName" id="productName" placeholder="enter product name"  />
                 
                             </div>
                             <div className="mb-2">
                                 <label htmlFor="price" className="font-body"> price</label><br />
                                 <input {...register("price")} className=" rounded w-full px-3 py-1 " type="number" name="price" id="price" placeholder="enter product price"  />
                             </div>
                             <div className="mb-2">
                                 <label htmlFor="price" className="font-body">quantity</label><br />
                                 <input {...register("stockQuantity")} className=" rounded w-full px-3 py-1 " type="number" name="stockQuantity" id="stockQuantity" placeholder="enter product stockQuantity"  />
                             </div>
                             <div className="mb-2">
                                 <label htmlFor="description" className="font-body">description</label><br />
                                 <input {...register("description")} className=" rounded w-full px-3 py-1 " type="text" name="description" id="description" placeholder="enter product description"  />
                             </div>

                        
                             <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                                 <input  className="text-center mx-auto items-center text-white " type="submit" value="Submit" />
                             </div>
                            </form>
                            
                         </div>
                </div>
      )
    }
        </div>
    );
};

export default UpdateProduct;