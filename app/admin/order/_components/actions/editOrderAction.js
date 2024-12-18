"use server";

import { editOrderSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const editOrderAction = async (formData, orderId) => {
  const results = editOrderSchema.safeParse(formData);
  if (!results.success) {
    return {
      error: results.error.errors, // Return validation errors
    };
  }
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: results.data.status,
      },
    });
    revalidatePath("/admin/order", "path");
  } catch (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};
