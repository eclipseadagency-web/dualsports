"use server";

import { filterSchema } from "@/lib/validationSchema";
import { redirect } from "next/navigation";

export const filterAction = async (data, categoryId, subCategoryId) => {
  const formData = Object.fromEntries(data);
  const results = filterSchema.safeParse(formData);
  if (!results.success) {
    return results.error.message;
  }
  const { q, color, sizeId } = results.data;

  const priceRangeArray = formData.priceRange.split(",");

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(color && { color }),
    ...(sizeId && { sizeId }),
    ...(formData.priceRange && {
      min: priceRangeArray[0],
      max: priceRangeArray[1],
    }),
  });

  redirect(
    `/category/${categoryId}${
      subCategoryId ? `/${subCategoryId}` : ""
    }/?${searchParams.toString()}`
  );
};
