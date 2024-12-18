"use server";
import prisma from "@/prismaClient";

export const getProductVariation = async (sizeId, colorId, productId) => {
  try {
    const variation = await prisma.productVariation.findFirst({
      where: {
        sizeId,

        productId,
      },
    });

    return variation;
  } catch (error) {
    console.log(error);
  }
};
