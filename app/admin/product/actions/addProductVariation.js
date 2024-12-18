"use server";

import { AddNewVariationSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const addProductVariation = async (formData, productId) => {
  const newData = Object.fromEntries(formData);
  const results = AddNewVariationSchema.safeParse(newData);
  if (results.success === false) {
    console.log(results.error.formErrors.fieldErrors);
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;

  try {
    await prisma.productVariation.create({
      data: {
        productId,
        regular_price: Number(data.regular_price),
        sale_price: Number(data.sale_price),
        sku: data.sku,
        bar_code: data.bar_code,
        quantity: Number(data.quantity),
        sizeId: data.sizeId,
      },
    });
    revalidatePath("/admin/product/edit-product/[id]", "page");
  } catch (error) {
    console.error(
      "Error during product variation update or image creation:",
      error
    );

    // Return an error response or handle the error accordingly
    return { error: error.message };
  }
};
