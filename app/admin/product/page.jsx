import { Button } from "@/components/ui/button";

import Link from "next/link";
import ProductTable from "./_components/ProductTable";
import PageHeader from "@/components/layout/PageHeader";
import prisma from "@/prismaClient";
import PaginationComponent from "@/app/(frontend)/_components/PaginationComponent";
const ProductsPage = async ({ searchParams }) => {
  const pageSize = 10;

  const page = parseInt(searchParams.page) || 1;

  const productsPromise = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCountPromise = await prisma.product.count({});

  const [products, totalCount] = await Promise.all([
    productsPromise,
    totalCountPromise,
  ]);

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <PageHeader>Product</PageHeader>
        <div className="flex flex-col gap-2 lg:flex-row">
          <Button asChild>
            <Link href="/admin/product/add-product">Add new Product</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/product/upload">Upload Prodcts</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/variations">Manage variations</Link>
          </Button>
        </div>
      </div>
      <ProductTable products={products} />
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  );
};

export default ProductsPage;
