import prisma from "@/prismaClient";
import React from "react";
import EditCategoryForm from "../../_components/EditCategoryForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubCategory from "../../_components/SubCategory";

const EditCategory = async ({ params }) => {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });
  const subCategories = await prisma.subCategory.findMany({
    where: {
      categoryId: params.id,
    },
  });

  return (
    <div>
      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit Category</TabsTrigger>
          <TabsTrigger value="variables">Subcategories</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <EditCategoryForm category={category} />
        </TabsContent>
        <TabsContent value="variables">
          <SubCategory subCategories={subCategories} categoryId={category.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditCategory;
