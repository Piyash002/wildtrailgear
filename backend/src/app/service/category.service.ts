import { Category, Tcategory } from "../model/categoy";
import { uploadToCloudinary } from "../ustils/cloudinary";

const createCategory = async(data:Tcategory, file: Express.Multer.File)=>{
    const { categoryName } = data;
    const uppercase =categoryName.toLocaleUpperCase()
    let imageUrls
    if (file !==undefined) {
 const uploads = await uploadToCloudinary(file) as { secure_url: string } | {  secure_url: string }[];
    imageUrls = Array.isArray(uploads) ? uploads[0]?.secure_url : uploads.secure_url;
}
    
   
    const category = new Category({
        categoryName:uppercase,
        image: imageUrls|| "" 

    });
    const result = await category.save();
    return result;
}

const getAllCategories = async()=>{
    const categories = await Category.find();
    return categories;
}
const getCategoryById = async(id: string)=>{
    const category = await Category.findById(id);
    return category;
}
const updateCategory = async (
  id: string,
  data: Partial<Tcategory>,
  file?: Express.Multer.File
) => {
  const updateData: any = {};

  if (file) {
    const uploads = await uploadToCloudinary(file) as
      | { secure_url: string }
      | { secure_url: string }[];

    updateData.image = Array.isArray(uploads)
      ? uploads[0]?.secure_url
      : uploads.secure_url;
  }

  if (data.categoryName) {
    updateData.categoryName = data.categoryName.toUpperCase();
  }


  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );

  return updatedCategory;
};

const deleteCategory = async(id: string)=>{
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
}

export const CategoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
