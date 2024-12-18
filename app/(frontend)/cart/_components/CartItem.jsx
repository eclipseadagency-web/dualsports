import Image from "next/image";
import React from "react";
import logo from "@/public/unknown.png";
import { formatPrice } from "@/lib/utils";
import CartOperations from "./CartOperations";
const CartItem = ({ item }) => {
  return (
    <li className="flex items-center gap-4">
      <div>
        <Image
          src={item.productVariation?.images[0]?.url || logo}
          width={200}
          height={200}
          alt="product image"
          className="rounded-lg"
        />
      </div>

      <div>
        <h3 className="text-lg text-gray-900">
          {item.productVariation.product.name}
        </h3>

        <dl className="mt-0.5 space-y-px text-[14px] text-gray-600">
          <div>
            <dt className="inline">Price:</dt>
            <dd className="inline">
              {formatPrice(item.productVariation.price)}
            </dd>
          </div>
          <div>
            <dt className="inline">Size:</dt>
            <dd className="inline">{item.productVariation.size.name}</dd>
          </div>

          <div>
            <dt className="inline">Color:</dt>
            <dd className="inline">{item.productVariation.color.name}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <CartOperations
          quantity={item.quantity}
          productVariationId={item.productVariation.id}
          cartItemId={item.id}
          stockLeft={item.productVariation.quantity}
        />
      </div>
    </li>
  );
};

export default CartItem;
