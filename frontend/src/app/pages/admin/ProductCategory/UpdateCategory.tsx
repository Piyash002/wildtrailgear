/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useAppSelector } from "../../../redux/Hooks";
import type { Tcategory } from "../../../types/types";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import {
  useDeletecategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/category/categoryApi/categoryApi";

const UpdateCategories = () => {
  const user = useAppSelector((state) => state.auth.user as { role?: string } | null);
  const { data: response, isLoading, isError, error } = useGetCategoriesQuery(undefined);
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeletecategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");

  const categories = response?.data ?? [];
  const { register, handleSubmit, reset, setValue } = useForm<Tcategory>();

  if (isLoading) {
    return <h1 className="text-center text-2xl font-body">Loading .....</h1>;
  }
  if (isError) return <p>Error: {(error as any)?.data?.message || "Something went wrong"}</p>;

  // Open modal and fill form values
  const handleEdit = (category: any) => {
    setIsModalOpen(true);
    setCategoryId(category._id as string);
    setValue("categoryName", category.categoryName);
    // NOTE: File inputs cannot be pre-filled programmatically, leave blank
  };

  // Delete category handler
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategory(id).unwrap();
      if (res.success) toast.success(res.message || "Category deleted successfully");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    reset();
  };

  // Submit update category form
  const onSubmit = async (data: Tcategory) => {
    const formData = new FormData();

    try {
      if (data.categoryName?.trim()) {
        formData.append("categoryName", data.categoryName);
      }
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      const res = await updateCategory({ formData, id: categoryId }).unwrap();
      if (res.success) {
        toast.success(res.message || "Category updated successfully");
        setIsModalOpen(false);
        reset();
      }
    } catch (err) {
      toast.error("Update failed");
      console.error("Error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border">Image</th>
              <th className="py-3 px-4 border">Category Name</th>
              {user?.role === "ADMIN" && <th className="py-3 px-4 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {categories.map((category: Tcategory) => (
              <tr key={category._id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.categoryName}
                      className="w-20 h-20 object-cover rounded mx-auto"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 flex items-center justify-center text-gray-500 rounded mx-auto">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-2 px-4 border text-center">{category.categoryName}</td>
                {user?.role === "ADMIN" && (
                  <td className="py-2 px-4 border text-center text-xl flex justify-center gap-6">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-green-600 hover:text-green-800"
                      aria-label="Edit category"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id!)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete category"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded shadow relative z-50 overflow-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-2xl"
              onClick={handleModalClose}
              aria-label="Close modal"
            >
              <IoIosClose />
            </button>

            <div className="text-center mb-6">
              <img
                src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png"
                alt="Logo"
                className="w-12 mx-auto"
              />
              <h2 className="text-xl font-semibold mt-2">Update Category</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block mb-1 font-medium">
                  Category Name
                </label>
                <input
                  {...register("categoryName")}
                  id="categoryName"
                  type="text"
                  placeholder="Category name"
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-1 font-medium">
                  Image
                </label>
                <input
                  {...register("image")}
                  id="image"
                  type="file"
                  accept="image/*"
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCategories;
