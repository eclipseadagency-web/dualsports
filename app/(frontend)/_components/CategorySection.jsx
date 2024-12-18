import prisma from "@/prismaClient";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategorySection = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return (
    <div className="my-20">
      <h2 className="text-3xl capitalize">shop by category</h2>
      <div className="grid grid-cols-3 lg:grid-cols-5 justify-between my-5 gap-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <div className="flex flex-col items-center gap-3 group">
              <Image
                src={category.imgUrl}
                height={150}
                width={150}
                alt="category"
                className="rounded-full  border-1 group-hover:drop-shadow-2xl group-hover:brightness-125 duration-300"
              />
              <p className="text-xl capitalize">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
