"use server";

import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";
import { deleteImage } from "../../../../lib/imageActions";

export const deleteProductImage = async (image) => {
  if (image.url) {
    const publicId = image.url.split("/").pop().split(".")[0];
    await deleteImage(publicId);
  }
  await prisma.image.delete({
    where: {
      id: image.id,
    },
  });
  revalidatePath("/product/[id]/edit-product", "page");
};
