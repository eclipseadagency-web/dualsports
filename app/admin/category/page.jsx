import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

import PageHeader from "@/components/layout/PageHeader";
import CategoryTable from "./_components/CategoryTable";

const CategoryPage = async () => {
  return (
    <>
      <div className="flex justify-between items-center my-5">
        <PageHeader>Category</PageHeader>
        <div className="flex gap-2">
          <Link
            href="/admin/category/add-category"
            className={buttonVariants({ size: "sm" })}
          >
            Add Category
          </Link>
        </div>
      </div>

      <CategoryTable />
    </>
  );
};

export default CategoryPage;
