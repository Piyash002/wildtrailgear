/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetallProductQuery } from "../../../redux/features/product/productAPi/productApi";

const Products = () => {
  const { data: response, isLoading } = useGetallProductQuery(null);
  const products = response?.data ?? [];

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 p-4  ">
      {products.map((product: any) => {
        const mainImage = product.images.find((img: any) => img.isMain);

        return (
          <div key={product._id} className="border p-2 rounded shadow-md  hover:shadow-slate-400">
            <img
              src={mainImage?.url || "/default.jpg"}
              alt={product.productName}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.productName}</h2>
            <p className="text-green-600 font-body ">৳ 
                     {product.price}</p>
            <a
              href={`/products/${product._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
