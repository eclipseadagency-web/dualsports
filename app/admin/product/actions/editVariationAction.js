"use server";

import { editVariationSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";

import { revalidatePath } from "next/cache";

export const editVariationAction = async (formData, variation) => {
  console.log(formData);
  const newData = Object.fromEntries(formData.entries());

  const results = editVariationSchema.safeParse(newData);

  if (results.success === false) {
    console.log(results.error.formErrors.fieldErrors);
    return results.error.formErrors.fieldErrors;
  }

  const data = results.data;

  await prisma.productVariation.update({
    where: { id: variation.id },
    data: {
      regular_price: Number(data.regular_price),
      sale_price: Number(data.sale_price),

      quantity: Number(data.quantity),
      sku: data.sku,
      bar_code: data.bar_code,
    },
  });

  // Revalidate the path after successful operations
  revalidatePath("/admin/product/edit-product/[id]", "page");
};
