import prisma from "@/prismaClient";
import Image from "next/image";
import React from "react";
import logo from "@/public/unknown.png";
import { formatPrice, truncate } from "@/lib/utils";
import Link from "next/link";
const SingleOrder = async ({ params }) => {
  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
      orderItems: {
        include: {
          productVariation: {
            include: {
              product: true,
              images: true,
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-3xl my-10">Order #{order.id}</h1>
      <div className="grid lg:grid-cols-[1fr,2fr] gap-10">
        <div className="border border-slate-300 rounded-lg p-4">
          <p className="text-slate-600 capitalize">order status</p>
          <h6 className="font-semibold my-2">{order.status}</h6>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-slate-300 rounded-lg p-4">
          <div>
            <p className="text-slate-600 capitalize">data of sale</p>
            <h6 className="font-semibold my-2">
              {new Date(order.createdAt).toDateString()}
            </h6>
          </div>
          <div>
            <p className="text-slate-600 capitalize">payment Method</p>
            <h6 className="font-semibold my-2 uppercase">
              {order.paymentMethod}
            </h6>
          </div>
          {order.Trnx_ID && (
            <div>
              <p className="text-slate-600 capitalize">Trnx ID</p>
              <h6 className="font-semibold my-2">{order.Trnx_ID}</h6>
            </div>
          )}
          <div>
            <p className="text-slate-600 capitalize">user name</p>
            <h6 className="font-semibold my-2">{order.user.name}</h6>
          </div>

          <div>
            <p className="text-slate-600 capitalize">City</p>
            <h6 className="font-semibold my-2">{order.city}</h6>
          </div>
          <div>
            <p className="text-slate-600 capitalize">street</p>
            <h6 className="font-semibold my-2">{order.street}</h6>
          </div>
          <div>
            <p className="text-slate-600 capitalize">building</p>
            <h6 className="font-semibold my-2">{order.building}</h6>
          </div>
          <div>
            <p className="text-slate-600 capitalize">postal code</p>
            <h6 className="font-semibold my-2">{order.postal_code}</h6>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-lg py-4 px-5 my-5">
        <h3 className="text-xl capitalize mb-10">order items</h3>
        {order?.orderItems.map((item) => (
          <div key={item.id} className="my-4">
            <div className="grid grid-cols-[4fr,1fr] ">
              <div className="flex gap-5">
                <Link href={`/product/${item.productVariation.product.id}`}>
                  <Image
                    src={item.productVariation?.images[0]?.url || logo}
                    width={75}
                    height={75}
                    alt="product image"
                    className="rounded-xl"
                  />
                </Link>
                <div>
                  <p className="font-semibold text-sm">
                    {truncate(item.productVariation.product.name, 25)}
                  </p>
                  <p className=" text-sm  font-semibold">
                    {formatPrice(item.productVariation.sale_price)}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <p>x {item.quantity}</p>
                <p className="">
                  {formatPrice(
                    item.productVariation.sale_price * item.quantity
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="w-100% h-[1px] bg-slate-300 my-5"></div>
        <div className="flex justify-between">
          <p className="text-slate-600 capitalize">total amount</p>
          <h6 className="font-semibold my-2  ">
            {formatPrice(order.totalAmount)}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
