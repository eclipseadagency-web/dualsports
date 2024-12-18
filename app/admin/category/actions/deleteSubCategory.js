"use server";

import { deleteImage } from "@/lib/imageActions";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const deleteSubCategory = async (subCategoryId) => {
  const subCategory = await prisma.subCategory.findUnique({
    where: { id: subCategoryId },
  });

  if (!subCategory) {
    throw new Error("Category not found");
  }

  // Delete the image from Cloudinary
  if (subCategory.imgUrl) {
    const publicId = subCategory.imgUrl.split("/").pop().split(".")[0];
    await deleteImage(publicId);
  }
  await prisma.subCategory.delete({
    where: {
      id: subCategoryId,
    },
  });
  revalidatePath("/admin/category/edit-category/[id]", "page");
};
