"use server";

import prisma from "@/prismaClient";

import { editCategorySchema } from "@/lib/validationSchema";
import { redirect } from "next/navigation";
import { deleteImage, uploadSingleImage } from "@/lib/imageActions";

export const editCategoryAction = async (formData, category) => {
  const newData = Object.fromEntries(formData.entries());
  const results = editCategorySchema.safeParse(newData);

  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;

  let imageUrl = data.imgUrl;

  if (formData.has("category_img")) {
    const file = formData.get("category_img");
    if (file instanceof File) {
      try {
        imageUrl = await uploadSingleImage(file); // Upload new image if provided
        const publicId = category?.imgUrl?.split("/").pop().split(".")[0];
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        return { category_img: ["Failed to upload image"] }; // Return error if image upload fails
      }
    }
  }
  try {
    await prisma.category.update({
      where: { id: category.id },
      data: {
        name: data.name,
        slug: data.slug,
        short_description: data.short_description,
        description: data.description,
        imgUrl: imageUrl,
      },
    });
  } catch (error) {
    return { error: error.message };
  }

  redirect("/admin/category");
};
