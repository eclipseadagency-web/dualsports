"use server";

import { varitionsSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const addSizeVariation = async (formData) => {
  const newData = Object.fromEntries(formData);
  const results = varitionsSchema.safeParse(newData);
  const data = results.data;

  try {
    await prisma.size.create({
      data: {
        name: data.name.toLowerCase(),
        size_type: data.size_type.toLowerCase(),
      },
    });
    revalidatePath("/admin/varition", "page");
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};
