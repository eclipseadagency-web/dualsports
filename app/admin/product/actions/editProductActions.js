"use server";

import { editProductSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";

import { uploadImages } from "../../../../lib/imageActions";
import { revalidatePath } from "next/cache";

export const editProductAction = async (formData, productId) => {
  const booleanFields = [
    "is_available",
    "is_bestSeller",
    "is_featured",
    "is_newArrival",
  ];
  const arrayFields = ["product_img"];
  const newData = Object.fromEntries(
    Array.from(formData.entries()).reduce((acc, [key, value]) => {
      // Handle boolean fields
      if (booleanFields.includes(key)) {
        acc.push([key, value === "true"]);
      }
      // Handle array fields
      else if (arrayFields.includes(key)) {
        if (!acc.find(([k]) => k === key)) {
          acc.push([key, []]);
        }
        acc.find(([k]) => k === key)[1].push(value);
      }
      // Handle all other fields
      else {
        acc.push([key, value]);
      }
      return acc;
    }, [])
  );
  const results = editProductSchema.safeParse(newData);
  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;
  let urls = [];
  if (newData.product_img) {
    urls = await uploadImages(newData.product_img);
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Update the product details
      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          categoryId: data.categoryId,
          subCategoryId: data.subCategoryId,
          name: data.name,
          slug: data.slug,
          color: data.color,
          short_description: data.short_description,
          description: data.description,
          is_available: data.is_available,
          is_bestSeller: data.is_bestSeller,
          is_featured: data.is_featured,
          is_newArrival: data.is_newArrival,
        },
      });

      // Conditionally create new images if urls are provided
      if (urls.length > 0) {
        await prisma.image.createMany({
          data: urls.map((url) => ({
            productId,
            url,
            description: `product ${productId} image`,
          })),
        });
      }
    });

    // If everything is successful
    revalidatePath("/admin/product/edit-product/[id]", "page");
  } catch (error) {
    // Handle the error
    console.error(
      "An error occurred while updating the product or images:",
      error.message
    );

    // Optionally, you can rethrow the error or handle it based on the context
    return { error: error.message };
  }
};
