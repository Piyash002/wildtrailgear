/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Tcategory, Tproduct } from "../../../types/types";
import { useAddProductMutation } from "../../../redux/features/product/productAPi/productApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { uploadToCloudinary } from "../../../utils/cloudinaryUpload";
import { useGetCategoriesQuery } from "../../../redux/features/category/categoryApi/categoryApi";

const AddProduct = () => {
    const {register, handleSubmit} = useForm<Tproduct>();
    const {data:response , isLoading} = useGetCategoriesQuery();
    const [addProduct] = useAddProductMutation()
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const categories = response?.data ?? []; 
    const onSubmit: SubmitHandler<Tproduct> = async (data: Tproduct) => {
  try {
    const fileList = (data as any).images as FileList;
    if (!fileList || fileList.length === 0) {
  toast.error("Please select at least one image");
  return;
}
    const cloudinaryUploads = await Promise.all(
      Array.from(fileList).map((file, i) =>
        uploadToCloudinary(file).then((url: any) => ({
          url,
          isMain: i === mainImageIndex,
        }))
      )
    );
    const productPayload = {
      productName: data.productName,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      stockQuantity:Number(data.stockQuantity),
      ratings: 0,
      images: cloudinaryUploads,
    }
    const res = await addProduct(productPayload).unwrap();
    console.log(res)
    if (res.success) toast.success(res.message);
  } catch (err: any) {
    console.error(err);
    toast.error(err?.message || "Something went wrong");
  }
};
    if(isLoading){
        <h1 className="text-xl">Loading</h1>
    }
    return (
        <div>
               <div  className=" justify-center items-center  backdrop:blur-sm bg-slate-200 rounded-lg shadow-lg mx-auto lg:w-96 w-11/12 my-auto lg:mt-10 mt-5  p-4 ">
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
                <label htmlFor="productName" className="font-body">Name</label><br />
                <input {...register("productName")} className=" rounded w-full px-3 py-1 " type="text" name="productName" id="productName" placeholder="Enter Product Name"  />

            </div>
            <div className="mb-2">
                <label htmlFor="price" className="font-body"> Price</label><br />
                <input {...register("price")} className=" rounded w-full px-3 py-1 " type="number" name="price" id="price" placeholder="Enter Product Price"  />
            </div>
            <div className="mb-2">
                <label htmlFor="price" className="font-body">Quantity</label><br />
                <input {...register("stockQuantity")} className=" rounded w-full px-3 py-1 " type="number" name="stockQuantity" id="stockQuantity" placeholder="Enter Product StockQuantity"  />
            </div>
            <div className="mb-2">
                <label htmlFor="description" className="font-body">Description</label><br />
                <input {...register("description")} className=" rounded w-full px-3 py-1 " type="text" name="description" id="description" placeholder="Enter Product Description"  />
            </div>
            <div className="mb-2">
                <label htmlFor="category" className="font-body">Category</label><br />
               {
                <select {...register("category")} id="categoryName" className="border p-2 rounded w-full">
          <option value="">-- Select Category --</option>
         {categories.map((category:Tcategory) => (
         <option key={category._id} value={category.categoryName}>
          {category.categoryName}
          </option>
  ))}
</select>

               }
            </div>
            <div className="mt-2">
                <label htmlFor="image">Image</label><br />
            <input
        type="file"
        multiple
        {...register("images")}
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            const previews = Array.from(files).map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
          }
        }}
      />
            </div>
             {previewImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previewImages.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                onClick={() => setMainImageIndex(i)}
                className={`cursor-pointer w-full h-24 object-cover rounded ${
                  mainImageIndex === i ? "border-4 border-green-500" : "border"
                }`}
              />
              <p className="text-xs text-center">{mainImageIndex === i ? "Main Image ✅" : "Click to make main"}</p>
            </div>
          ))}
        </div>
      )}
            
            <div className=" text-center bg-blue-500  rounded py-2 mt-4 ">
                <input  className="text-center mx-auto items-center text-white " type="submit" value="Submit" />
            </div>
           </form>
           
        </div>
        </div>
    );
};

export default AddProduct;