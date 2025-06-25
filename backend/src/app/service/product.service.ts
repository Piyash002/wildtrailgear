
import AppError from "../errors/AppError";
import { Product, Tproduct } from "../model/products";
const createProduct = async(data:Tproduct,  mainIndex:any)=>{
    const { productName, price, description, category,images,stockQuantity } = data;
    const priceIntoNumber = Number(price)
    const stockQuantityIntoNumber = Number(stockQuantity)
    if (!Array.isArray(images)) {
      throw new AppError(404, "image must be arra")
    }
    const product = new Product({
        productName,
        price:priceIntoNumber,
        description,
        stockQuantity:stockQuantityIntoNumber,
        category,
        images
    });
    const result = await product.save();
    return result;
}
  const getAllProducts = async ()=>{
    const result = await Product.find();
    return result;
}
const  getProductById = async(id:string)=>{
const existProduct  = await Product.findById(id);
if(!existProduct){
  throw new AppError(404, 'Product not found')
}
const result = await Product.findById(id);
return result
}
const  getProductByCategory = async(searhTerm:any)=>{
 const categoryName = searhTerm.category;

  let query = {}
if(categoryName){
  query = {category:categoryName}
}
const existProduct  = await Product.find(query);
if(!existProduct){
  throw new AppError(404, 'Product not found')
}
const result = await Product.find(query);
return result

}
const updateProduct = async(id:string, data:Tproduct)=>{
  const existProduct = await Product.findById(id);
  if(!existProduct){
    throw new AppError(404, "product not found")
  };
  const Updatedata = {
    productName: data.productName,
    price: data.price,
    description: data.description,
    stockQuantity: data.stockQuantity,
    category: data.category,
    images: data.images
  }
  const updateProduct = await Product.findOneAndUpdate({_id:id}, {
    $set:Updatedata
  }, {new:true});
  return updateProduct
}
const decreaseProduct = async (id: string, quantity: any) => {

  const parsedQty = Number(quantity);
  if (isNaN(parsedQty) || parsedQty <= 0) {
    throw new AppError(400, "Invalid quantity");
  }


  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new AppError(404, "Product not found");
  }

  const currentStock = Number(existProduct.stockQuantity);
  if (isNaN(currentStock)) {
    throw new AppError(500, "Current stock quantity is invalid");
  }


  const newStock = currentStock - parsedQty;
  if (newStock < 0) {
    throw new AppError(400, "Not enough stock available");
  }


  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { stockQuantity: newStock },
    { new: true }
  );

  return updatedProduct;
};

const deleteProduct = async( id:string)=>{
  const existProduct = await Product.findById(id);
  if(!existProduct){
    throw new AppError(404, "product not found")
  };
  const result = await Product.findByIdAndDelete(id);
  return result;
}
export const ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByCategory,
    updateProduct,
    deleteProduct,
    decreaseProduct
};
