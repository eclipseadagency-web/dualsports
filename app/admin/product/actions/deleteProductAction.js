"use server";

import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";
import { deleteImage } from "../../../../lib/imageActions";

export const deleteProductActions = async (productId, productImages) => {
  productImages.map(async (image) => {
    const publicId = image.url.split("/").pop().split(".")[0];

    await deleteImage(publicId);
  });
  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    revalidatePath("/admin/product", "page");
  } catch (error) {
    return { error: error.message };
  }
};
