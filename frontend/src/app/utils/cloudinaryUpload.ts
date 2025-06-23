export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_upload"); // ✅ use YOUR unsigned preset name

  const cloudName = "dspanswyr"; 

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Cloudinary Error:", data);
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }
console.log(data.secure_url)
  return data.secure_url;
};
