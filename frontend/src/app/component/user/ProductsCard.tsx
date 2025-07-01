/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Tproduct } from "../../types/types";

interface AllProductsProps {
  products: Tproduct[];
}

const ProductsCard = ({ products }: AllProductsProps) => {
    return (
        <div>
              <div className="">
          <div className="grid  lg:grid-cols-4 grid-cols-2 gap-2 mt-2 ">
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
            <p className="text-secondary font-semibold ">৳ 
          {product.price}</p>
             <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-xl ${i < product?.avarageratings ? "text-yellow-400" : "text-gray-300"}`}>
                ★
              </span>
            ))}
            <span className="text-sm text-gray-500 ml-2">({product?.avarageratings || 0})</span>
          </div>
            <a
              href={`/products/${product._id}`}
              className="text-primary hover:underline"
            >
              View Details
            </a>
          </div>
        );
      })}
    </div>
    </div>
        </div>
    );
};

export default ProductsCard ;