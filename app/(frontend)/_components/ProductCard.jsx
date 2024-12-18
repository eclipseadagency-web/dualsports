import { formatPrice, truncate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/unknown.png";
const ProductCard = ({ product }) => {
  return (
    <Link href={"/product/" + product.id}>
      <div>
        <Image
          src={product.images[0]?.url || logo}
          width={250}
          height={250}
          alt="product image"
          className="rounded-xl"
        />
        <h3 className="capitalize text-gray-500 my-1 font-light text-sm">
          {truncate(product.category.name, 25)}
        </h3>
        <p className="   font-bold">{truncate(product.name, 25)}</p>
        <p className="text-lg text-blue-700 font-extrabold my-1">
          {formatPrice(product.variations[0].regular_price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
