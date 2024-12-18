import prisma from "@/prismaClient";
import React from "react";
import ProductCard from "../../_components/ProductCard";
import PaginationComponent from "../../_components/PaginationComponent";
import JobFilterSide from "../../_components/JobFilterSide";

const SingleCategoryPage = async ({ params, searchParams }) => {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  let sizeType = category.name.toLowerCase() == "kids" ? "kids" : "clothing";
  const sizes = await prisma.size.findMany({ where: { size_type: sizeType } });
  const productColors = await prisma.product.findMany({
    select: { color: true, id: true },
    distinct: ["color"],
  });

  const searchValues = {
    q: searchParams?.q,
    color: searchParams?.color,
    sizeId: searchParams?.sizeId,
    min: searchParams?.min,
    max: searchParams?.max,
  };
  const pageSize = 8;

  const page = parseInt(searchParams.page) || 1;

  const productsPromise = prisma.product.findMany({
    where: {
      categoryId: params.id,

      ...(searchValues.color && { color: searchValues.color }),
    },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: true,
      variations: {
        where: {
          AND: [
            searchValues.sizeId && { sizeId: searchValues.sizeId },
            searchValues.min &&
              searchValues.max && {
                regular_price: {
                  gte: Number(searchValues.min),
                  lte: Number(searchValues.max),
                },
              },
          ].filter(Boolean), // Filters out any `false` or `null` conditions
        },
        include: {
          images: true,
        },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const countPromise = prisma.product.count({
    where: {
      categoryId: params.id,

      ...(searchValues.color && { color: searchValues.color }),
      // Filter by category ID
      variations: {
        every: {
          // Ensure that every variation matches all the filters
          AND: [
            searchValues.sizeId && { sizeId: searchValues.sizeId },
            searchValues.min &&
              searchValues.max && {
                regular_price: {
                  gte: Number(searchValues.min),
                  lte: Number(searchValues.max),
                },
              },
          ].filter(Boolean), // Filters out any `false` or `null` conditions
        },
      },
    },
  });

  const [products, totalCount] = await Promise.all([
    productsPromise,
    countPromise,
  ]);

  const filteredProducts = products?.filter(
    (product) => product.variations.length > 0
  );

  if (filteredProducts?.length < 1) {
    return <p>there are no products....expand your filters</p>;
  }
  return (
    <div className="container ">
      <div className="flex gap-4 md:flex-row">
        <JobFilterSide
          sizes={sizes}
          categoryId={params.id}
          productColors={productColors}
        />

        <div>
          <div className="grid md:grid-cols-4 gap-4 grid-cols-2">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <PaginationComponent
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryPage;
