"use server";

import prisma from "@/prismaClient";

export const fetchSubcategoriesAction = async (categoryId) => {
  const subCategories = await prisma.subCategory.findMany({
    where: {
      categoryId,
    },
  });
  return subCategories;
};
