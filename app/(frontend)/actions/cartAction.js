"use server";

import { createCart, getCart } from "@/lib/cart";
import { pickVariationSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const incrementCartQuantity = async (formData, productId) => {
  const newData = Object.fromEntries(formData);
  const results = pickVariationSchema.safeParse(newData);
  if (results.success === false) {
    return { errors: results.error.formErrors.fieldErrors };
  }
  const data = results.data;
  const cart = (await getCart()) ?? (await createCart());
  console.log("serveraction");
  console.log(data.sizeId, data.colorId, productId);
  const productVariation = await prisma.productVariation.findFirst({
    where: {
      productId,
      sizeId: data.sizeId,
      colorId: data.colorId,
    },
  });

  if (!productVariation) {
    return { error: "there is no product variation" };
  }

  const articleInCart = cart.cartItems?.find(
    (item) => item.productVariationId === productVariation.id
  );
  if (articleInCart) {
    try {
      await prisma.cartItem.update({
        where: {
          id: articleInCart.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      revalidatePath("/product/[id]", "page");
      return { message: "product quantity increased" };
    } catch (error) {
      return { error: error.message };
    }
  } else {
    try {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productVariationId: productVariation.id,
          quantity: 1,
        },
      });
      revalidatePath("/product/[id]", "page");
      return { message: "product added successfully" };
    } catch (error) {
      return { error: error.message };
    }
  }
};
export const setCartItemQuantity = async (productVariationId, quantity) => {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.cartItems.find(
    (item) => item.productVariationId === productVariationId
  );
  try {
    await prisma.cartItem.update({
      where: {
        id: articleInCart.id,
      },
      data: {
        quantity: quantity,
      },
    });
    revalidatePath("/cart");
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};
export const removeCartItem = async (cartItemId) => {
  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
    revalidatePath("/cart");
  } catch (error) {
    return { error: error.message };
  }
};

export async function mergeAnonymousCartIntoUserCart(userId) {
  const localCartId = cookies().get("localCartId")?.value;

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { cartItems: true },
      })
    : null;

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { cartItems: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(
        localCart.cartItems,
        userCart.cartItems
      );

      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          cartItems: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productVariationId: item.productVariationId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          cartItems: {
            createMany: {
              data: localCart.cartItems.map((item) => ({
                productVariationId: item.productVariationId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    await tx.cart.delete({
      where: { id: localCart.id },
    });
    // throw Error("Transaction failed");
    cookies().set("localCartId", "");
  });
}

function mergeCartItems(...cartItems) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find(
        (i) => i.productVariationId === item.productVariationId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, []);
}
