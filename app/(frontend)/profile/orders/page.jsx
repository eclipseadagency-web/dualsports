import OrderTable from "@/app/admin/order/_components/OrderTable";
import { auth } from "@/auth";
import prisma from "@/prismaClient";
import React from "react";

const ProfileOrders = async () => {
  const session = await auth();
  const userOrders = await prisma.order.findMany({
    where: { userId: session?.user.id },
    include: {
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
      <OrderTable orders={userOrders} isAdmin={false} />
    </div>
  );
};

export default ProfileOrders;
