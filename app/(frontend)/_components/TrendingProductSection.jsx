import prisma from "@/prismaClient";
import React from "react";
import ProductCard from "./ProductCard";

const TrendingProductSection = async () => {
  const products = await prisma.product.findMany({
    where: {
      is_featured: true,
    },
    orderBy: {
      name: "asc",
    },
    include: {
      images: true,
      category: true,
      variations: true,
    },
    take: 5,
  });

  return (
    <div className="my-20">
      <h2 className="capitalize text-3xl my-5">trending</h2>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 grid-cols-2">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProductSection;
