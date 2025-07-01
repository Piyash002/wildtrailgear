/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import toast from "react-hot-toast";
import {
  useDeleteProductMutation,
  useGetallProductQuery,
  useUpdateProductMutation,
} from "../../../redux/features/product/productAPi/productApi";
// import { useAppSelector } from "../../../redux/Hooks";
import type { Tproduct } from "../../../types/types";

const UpdateProduct = () => {
  // const user = useAppSelector((state) => state.auth.user as { role?: string } | null);
  const { data: response, isLoading } = useGetallProductQuery(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("productName");
  const [sortAsc, setSortAsc] = useState(true);
  const products = response?.data?.result ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Tproduct>();

  const handleEdit = (product: any) => {
    setIsModalOpen(true);
    setProductId(product._id);
    setValue("productName", product.productName);
    setValue("price", product.price);
    setValue("stockQuantity", product.stockQuantity);
    setValue("description", product.description);
    setValue("category", product.category);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduct({ id }).unwrap();
      if (res.success) toast.success(res.message || "Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data: Tproduct) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("price", data.price.toString());
      formData.append("stockQuantity", data.stockQuantity.toString());
      if (data.category?.trim()) formData.append("category", data.category);
      if (data.description?.trim()) formData.append("description", data.description);

      const res = await updateProduct({ formData, id: productId }).unwrap();
      if (res.success) {
        toast.success(res.message || "Product updated successfully");
        setIsModalOpen(false);
        reset();
      }
    } catch (err) {
      toast.error("Product update failed");
    }
  };

  const filteredSortedProducts = useMemo(() => {
    const filtered = products.filter((p: any) =>
      p.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [products, searchTerm, sortField, sortAsc]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {/* Search and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search product name"
          className="px-3 py-2 border rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="productName">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="category">Sort by Category</option>
        </select>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-2 border rounded bg-gray-200"
        >
          {sortAsc ? "Asc" : "Desc"}
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSortedProducts.map((product: any) => {
              const mainImage = product.images.find((img: any) => img.isMain);
              return (
                <tr key={product._id} className="text-center border-t">
                  <td className="py-2 px-4 border">
                    <img
                      src={mainImage?.url || "/default.jpg"}
                      alt={product.productName}
                      className="h-12 w-12 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border">{product.productName}</td>
                  <td className="py-2 px-4 border">TK {product.price}</td>
                  <td className="py-2 px-4 border">{product.category}</td>
                  <td className="py-2 px-4 border text-xl flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded shadow relative z-50 overflow-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={handleModalClose}
            >
              <IoIosClose />
            </button>
            <div className="text-center mb-6">
              <img
                src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png"
                alt="logo"
                className="w-12 mx-auto"
              />
              <h2 className="text-xl font-semibold mt-2">Update Product</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                  {...register("productName")}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  {...register("price")}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Stock Quantity</label>
                <input
                  {...register("stockQuantity")}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <input
                  {...register("category")}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Category"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  {...register("description")}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Description"
                  rows={3}
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

export default UpdateProduct;
