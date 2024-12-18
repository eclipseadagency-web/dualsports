import EditProductVariation from "@/app/admin/product/_components/EditProductVariation";
import prisma from "@/prismaClient";
import React from "react";

const EditVariationPage = async ({ params }) => {
  const variation = await prisma.productVariation.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
    },
  });

  return (
    <div>
      <EditProductVariation variation={variation} />
    </div>
  );
};

export default EditVariationPage;
