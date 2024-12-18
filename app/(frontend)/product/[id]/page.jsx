import prisma from "@/prismaClient";
import React from "react";
import SingleProductPage from "../_components/SingleProductPage";

const SingleProduct = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
      category: true,
      variations: {
        include: {
          size: true,

          images: true,
        },
      },
    },
  });

  const sizes = await prisma.size.findMany({});

  return (
    <>
      <SingleProductPage sizes={sizes} product={product} />
    </>
  );
};

export default SingleProduct;
