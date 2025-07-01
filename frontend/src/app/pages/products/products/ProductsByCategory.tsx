import { useParams } from 'react-router-dom';
import { useGetProductByCategoryQuery } from '../../../redux/features/product/productAPi/productApi';

import ProductsCard from '../../../component/user/ProductsCard';

const ProductsByCategory = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { data, isLoading, error } = useGetProductByCategoryQuery(categoryName!,
     {skip: !categoryName}
  );
  const products = data?.data ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load products</p>;
  return (
    <div className="">
      <ProductsCard products={products}/>
    </div>
  );
};

export default ProductsByCategory;
