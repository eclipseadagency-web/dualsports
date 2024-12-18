"use server";

import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";
import { deleteImage } from "../../../../lib/imageActions";

export const deleteVariation = async (variation) => {
  const publicId = variation.images[0]?.url.split("/").pop().split(".")[0];
  if (publicId) {
    await deleteImage(publicId);
  }
  await prisma.productVariation.delete({
    where: {
      id: variation.id,
    },
  });
  revalidatePath("/admin/product/edit-product/[id]", "page");
};
