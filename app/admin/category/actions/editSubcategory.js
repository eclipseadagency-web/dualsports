"use server";

import { deleteImage, uploadSingleImage } from "@/lib/imageActions";
import { editSubCategorySchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const editSubCategoryAction = async (formData, subCategory) => {
  const newData = Object.fromEntries(formData.entries());

  const results = editSubCategorySchema.safeParse(newData);

  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;
  let imageUrl = data.subCategory_img;

  if (formData.has("subCategory_img")) {
    const file = formData.get("subCategory_img");
    if (file instanceof File) {
      try {
        imageUrl = await uploadSingleImage(file); // Upload new image if provided
        const publicId = subCategory?.imgUrl?.split("/").pop().split(".")[0];
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        return { subCategory_img: ["Failed to upload image"] }; // Return error if image upload fails
      }
    }
  }

  await prisma.subCategory.update({
    where: { id: subCategory.id },
    data: {
      name: data.name,
      slug: data.slug,
      short_description: data.short_description,
      description: data.description,

      imgUrl: imageUrl,
    },
  });

  revalidatePath("/admin/category/edit-category/[id]", "page");
};
