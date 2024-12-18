import React from "react";

import ProductForm from "../_components/ProductForm";
import prisma from "@/prismaClient";
import PageHeader from "@/components/layout/PageHeader";

const AddProductPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  const sizes = await prisma.size.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageHeader>add new product</PageHeader>
      <ProductForm categories={categories} sizes={sizes} />
    </div>
  );
};

export default AddProductPage;
