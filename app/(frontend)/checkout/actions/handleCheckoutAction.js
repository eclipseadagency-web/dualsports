"use server";

import { auth } from "@/auth";
import { getCart } from "@/lib/cart";
import { checkoutSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { redirect } from "next/navigation";
import {
  createOrder,
  generatePaymentKey,
  handlePaymentAction,
} from "./handlePaymentAction";

export const checkoutAction = async (formData) => {
  const results = checkoutSchema.safeParse(formData);
  if (!results.success) {
    throw new Error("Validation failed");
  }
  const cart = await getCart();
  const session = await auth();
  const orderItems = cart.cartItems.map((cartItem) => {
    return {
      productVariationId: cartItem.productVariationId,
      quantity: cartItem.quantity,
      price: cartItem.productVariation.price,
    };
  });
  if (results.data.payment_method == "cod") {
    await addOrderToDb(results.data, "cod", session, orderItems, cart);
  } else {
    const myOrder = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        totalAmount: cart.subtotal,
        paymentMethod: "paymob",
        apartment: results.data.apartment,
        building: results.data.building,
        city: results.data.city,
        floor: results.data.floor,
        postal_code: results.data.postal_code,
        street: results.data.street,
        phone_number: results.data.phone_number,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    });

    const token = await handlePaymentAction();
    const OrderId = await createOrder(
      token,
      cart.subtotal,
      myOrder.id,
      cart.id
    );
    const PaymentResults = await generatePaymentKey(
      token,
      OrderId,
      cart.subtotal,
      results.data,
      session.user
    );
    redirect(
      `https://accept.paymob.com/api/acceptance/iframes/862533?payment_token=${PaymentResults}`
    );
  }

  redirect("/thankyou");
};

export const addOrderToDb = async (
  formData,
  paymentMethod,
  session,
  orderItems,
  cart
) => {
  await prisma.$transaction(async (tx) => {
    // first will create a new order with a new order items
    await tx.order.create({
      data: {
        userId: session?.user.id,
        totalAmount: cart.subtotal,
        paymentMethod: paymentMethod,
        apartment: formData.apartment,
        building: formData.building,
        city: formData.city,
        floor: formData.floor,
        phone_number: formData.phone_number,
        postal_code: formData.postal_code,
        street: formData.street,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    });
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
