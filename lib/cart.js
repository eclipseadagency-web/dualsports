import { auth } from "@/auth";
import prisma from "@/prismaClient";
import { cookies } from "next/headers";

export const createCart = async () => {
  const session = await auth();
  let newCart;
  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session?.user.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
};

export const getCart = async () => {
  const session = await auth();

  let cart;
  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        cartItems: {
          include: {
            productVariation: {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
                images: true,
                size: true,
              },
            },
          },
        },
      },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    if (!localCartId) {
      return null;
    }
    cart = await prisma.cart.findFirst({
      where: {
        id: localCartId,
      },
      include: {
        cartItems: {
          include: {
            productVariation: {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
                images: true,
                size: true,
                color: true,
              },
            },
          },
        },
      },
    });
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.productVariation.price,
      0
    ),
  };
};
