import Image from "next/image";
import React from "react";

import EditSubCategory from "./EditSubCategory";
import SubCategoryForm from "./SubCategoryForm";
import DeleteSubCategory from "./DeleteSubCategory";

const SubCategory = async ({ subCategories, categoryId }) => {
  const categories = await prisma.category.findMany({});

  return (
    <>
      {subCategories.length < 1 ? (
        <p>there are no subcategories for this category</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {subCategories.map((subCategory) => (
            <div
              key={subCategory.id}
              className="relative  p-5 bg-slate-100 rounded-lg"
            >
              <div>
                <Image
                  src={subCategory.imgUrl || "/unknown.png"}
                  height={200}
                  width={200}
                  alt=""
                />

                <EditSubCategory
                  subCategory={subCategory}
                  categories={categoryId}
                />
              </div>

              <div className="absolute top-4 right-4">
                <DeleteSubCategory subCategory={subCategory} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 flex justify-center">
        <h2 className="text-3xl capitalize">you can add a new SubCategory</h2>
      </div>
      <div className="my-10">
        <SubCategoryForm categories={categories} categoryId={categoryId} />
      </div>
    </>
  );
};

export default SubCategory;
