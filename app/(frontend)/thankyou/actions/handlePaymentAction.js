"use server";

import { auth } from "@/auth";
import { getCart } from "@/lib/cart";
import prisma from "@/prismaClient";

export const handlePaymentAction = async () => {
  const cart = await getCart();
  const session = await auth();
  const user = session.user;

  await prisma.$transaction(async (tx) => {
    // first will create a new order with a new order items

    // then will reduce the order quantity from the stock quantity...which is is the product variation
    await Promise.all(
      cart.cartItems.map(async (cartItem) => {
        const product = await tx.productVariation.findUnique({
          where: { id: cartItem.productVariationId },
        });

        if (!product || product.quantity < cartItem.quantity) {
          throw new Error(
            `Not enough stock for product ${cartItem.productVariationId}`
          );
        }

        await tx.productVariation.update({
          where: { id: cartItem.productVariationId },
          data: {
            quantity: {
              decrement: cartItem.quantity,
            },
          },
        });
      })
    );
    // and in the end will delete the cart with all the cart items
    await tx.cart.delete({
      where: {
        id: cart.id,
      },
    });
  });
};
