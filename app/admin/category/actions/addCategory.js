"use server";

import prisma from "@/prismaClient";

import { addCategorySchema } from "@/lib/validationSchema";
import { redirect } from "next/navigation";
import { uploadSingleImage } from "@/lib/imageActions";

export const addCategoryAction = async (formData) => {
  const newData = Object.fromEntries(formData.entries());
  const results = addCategorySchema.safeParse(newData);

  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;

  const url = await uploadSingleImage(data.category_img);

  await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      short_description: data.short_description,
      description: data.description,
      imgUrl: url,
    },
  });
  redirect("/admin/category");
};
