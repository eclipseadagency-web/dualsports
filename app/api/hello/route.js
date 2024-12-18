import { auth } from "@/auth";
import { getCart } from "@/lib/cart";
import prisma from "@/prismaClient";

export const POST = async (request) => {
  const session = await auth();
  console.log(session);
  const res = await request.json();
  return Response.json(res);
};
export const GET = async () => {
  const session = await auth();
  console.log(session);
  const cart = await prisma.cart.findFirst({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json({ session, cart });
};
