import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// function that uploads the images to cloudinary and returns the secure url for each image
export const uploadImages = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            // tags: ["nextjs-server-actions-upload-sneakers"],
            // upload_preset: "nextjs-server-actions-upload",
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result.secure_url);
          }
        )
        .end(buffer);
    });
  });

  // Wait for all the uploads to complete
  const urls = await Promise.all(uploadPromises);

  // Return the array of URLs
  return urls;
};

export const uploadSingleImage = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          // Specify any upload options here, e.g., tags, upload_preset
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });

  // Return the URL of the uploaded image
  return url;
};

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  } catch (error) {
    throw error;
  }
};
