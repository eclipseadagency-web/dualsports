"use server";

import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const deleteVariationAction = async (variationId) => {
  try {
    await prisma.size.delete({
      where: {
        id: variationId,
      },
    });
    revalidatePath("/admin/varition", "page");
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};
