"use server";
import prisma from "@/prismaClient";
import { uploadImages } from "../../../../lib/imageActions";
import { redirect } from "next/navigation";
import { addProductSchema } from "@/lib/validationSchema";

export const addProductAction = async (formData) => {
  const booleanFields = [
    "is_available",
    "is_bestSeller",
    "is_featured",
    "is_newArrival",
  ];
  const arrayFields = ["product_img", "sizes"];

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

  const sizes = JSON.parse(newData.sizes);
  const results = addProductSchema.safeParse(newData);

  if (results.success === false) {
    return { errors: results.error.formErrors.fieldErrors };
  }
  const data = results.data;
  const urls = await uploadImages(newData.product_img);

  // Wrap the entire operation in a transaction to ensure atomicity
  await prisma.$transaction(async (prisma) => {
    // Create the product with images
    const product = await prisma.product.create({
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
        images: {
          create: urls.map((url) => ({
            url: url,
            description: `product ${data.name} image`,
          })),
        },
      },
    });

    // Prepare variations by mapping over colors and sizes
    const variations = sizes
      .map((size) => ({
        productId: product.id,
        sizeId: size.id,
        sale_price: Number(data.sale_price),
        regular_price: Number(data.regular_price),
        quantity: Number(data.quantity),
        bar_code: data.bar_code,
      }))
      .flat();

    // Bulk create product variations
    await prisma.productVariation.createMany({
      data: variations,
    });
  });

  redirect("/admin/product");
};
