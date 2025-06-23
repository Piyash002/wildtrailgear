/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useGetProductByCategoryQuery } from '../../../redux/features/product/productAPi/productApi';
import { Link } from 'react-router-dom';

const ProductsByCategory = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { data, isLoading, error } = useGetProductByCategoryQuery(categoryName!,
     {skip: !categoryName}
  );
  const products = data?.data ?? [];
//   cosnt 
//   const {data:ProductDetails} = useGetProductDteailsQuery()
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {
        products.length === 0 && (
          <p className="col-span-6 text-center text-lg font-semibold items-center mt-24">
            No products found in this category.
          </p>
        )
      }
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
            <p className="text-green-600 font-body ">৳ 
                     {product.price}</p>
            <p className="text-sm">{product.category}</p>
            {/* <p className="text-sm">{product.ratings}</p> */}
            <Link
              to={`/products/${product._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsByCategory;
