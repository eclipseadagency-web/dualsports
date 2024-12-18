import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";

import { mergeAnonymousCartIntoUserCart } from "./app/(frontend)/actions/cartAction";
import prisma from "@/prismaClient";
import { getNameBeforeAt } from "./lib/utils";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonymousCartIntoUserCart(user.id);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: getNameBeforeAt(user.email) || "user",
        },
      });
    },
  },
});
