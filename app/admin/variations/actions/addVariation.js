"use server";

import { varitionsSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const addSizeVariation = async (formData, varition) => {
  const newData = Object.fromEntries(formData);
  const results = varitionsSchema.safeParse(newData);
  const data = results.data;
  if (varition == "size") {
    try {
      await prisma.size.create({
        data: {
          name: data.name.toLowerCase(),
        },
      });
      revalidatePath("/admin/varition", "page");
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  } else {
    try {
      await prisma.color.create({
        data: {
          name: data.name.toLowerCase(),
        },
      });
      revalidatePath("/admin/varition", "page");
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  }
};
