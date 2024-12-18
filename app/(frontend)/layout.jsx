import MainNavbar from "@/components/layout/MainNavbar";
import { getCart } from "@/lib/cart";
import prisma from "@/prismaClient";

import React from "react";

const layout = async ({ children }) => {
  const cart = await getCart();
  const category = await prisma.category.findMany({});
  const subCategory = await prisma.subCategory.findMany({});

  return (
    <div>
      <>
        <MainNavbar cart={cart} category={category} subCategory={subCategory} />
      </>
      <div>{children}</div>
    </div>
  );
};

export default layout;
