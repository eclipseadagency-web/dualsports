"use server";
import { deleteImage } from "@/lib/imageActions";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const deleteCategoryAction = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // Delete the image from Cloudinary
  if (category.imgUrl) {
    const publicId = category.imgUrl.split("/").pop().split(".")[0];
    await deleteImage(publicId);
  }
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  revalidatePath("/admin/category", "page");
};
