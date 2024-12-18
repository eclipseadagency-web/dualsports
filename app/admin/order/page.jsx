import prisma from "@/prismaClient";
import React from "react";
import OrderTable from "./_components/OrderTable";

const OrderPage = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div>
      <OrderTable orders={orders} isAdmin={true} />
    </div>
  );
};

export default OrderPage;
