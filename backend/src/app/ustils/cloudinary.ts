// src/utils/cloudinaryUploader.ts
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import { extractPublicId } from "cloudinary-build-url";
import multer from "multer";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

type UploadResult = {
  secure_url: string;
  public_id: string;
};

// 🔵 Main uploader function (unified for single/multiple)
export const uploadToCloudinary = async (
  files: Express.Multer.File | Express.Multer.File[]
): Promise<UploadResult[]> => {
  const filesArray = Array.isArray(files) ? files : [files];

  const uploadPromises = filesArray.map((file) => {
    return new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "products",
          public_id: uuid(),
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      ).end(file.buffer);
    });
  });

  return await Promise.all(uploadPromises);
};
export const upload = multer({ storage: multer.memoryStorage() });




// ✅ Delete from Cloudinary
export const deleteImageFromCloudinary = async (cloudinaryUrl: string) => {
  try {
    const publicId = extractPublicId(cloudinaryUrl);
    await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary:", publicId);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
  }
};
