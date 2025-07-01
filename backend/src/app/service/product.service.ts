
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
const getAllProducts = async (query: Record<string, unknown>) => {
  const category = typeof query?.category === "string" ? query.category : '';
  const price = typeof query?.price === "string" ? query.price : '';
  const ratings = typeof query?.ratings === "string" ? query.ratings : '';
  const search = typeof query?.search === "string" ? query.search : '';
  const page = typeof query?.page === "string" ? query.page : "1";
  const limit = typeof query?.limit === "string" ? query.limit : "10";

  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  const skip = (pageInt - 1) * limitInt;

  let filters:any = {};
// category filter
  if (category) {
    filters = {category:category}
  }

// rating filter
  if (ratings) {
    filters =({ ratings: { $gte: Number(ratings) } });
  }

// price filter
  if (price && price.includes("-")) {
    console.log(price)
    const [min, max] = price.split("-").map(Number);
    console.log(min, max)
    filters = ({ price: { $gte: min, $lte: max } });
  }

// search filter
  if (search.trim() !== "") {
    const regEx = new RegExp(search, "i");
    filters = ({
      $or: [
        { productName: regEx },
        { brand: regEx },
        { category: regEx },
        { description: regEx },
      ],
    });
  }

  const total = await Product.countDocuments(filters);
  const result = await Product.find(filters)
      .sort({ _id: -1 })
      .skip(skip )
      .limit(limitInt);
  const totalPage = Math.ceil(total / limitInt);

  return {
    result,
    totalPage,
    total,
    limit: limitInt,
    page: pageInt,
  };
};
const soldPQuantity = async () => {
  const bestSellers = await Product.find()
  .sort({ soldCount: -1 })
  .limit(10);
  return bestSellers

};
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
const totalSell = async (id: string, quantity: any) => {
  const parsedQty = Number(quantity);
  if (isNaN(parsedQty) || parsedQty <= 0) {
    throw new AppError(400, "Invalid quantity");
  }

  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new AppError(404, "Product not found");
  }

  // Optionally check stock before updating
  if (existProduct.stockQuantity < parsedQty) {
    throw new AppError(400, "Not enough stock");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $inc: {
        soldCount: parsedQty, // ✅ Only increment by new quantity
        stockQuantity: -parsedQty      // ✅ Optional: reduce available stock
      }
    },
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
    decreaseProduct,
    totalSell,
    soldPQuantity,
};
