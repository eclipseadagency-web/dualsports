import React from "react";
import CheckoutForm from "./_components/CheckoutForm";
import { auth } from "@/auth";
import Link from "next/link";

const CheckoutPage = async () => {
  const session = await auth();
  if (!session?.user) {
    return (
      <div>
        <p>you have to login to make an order</p>

        <Link href={"/api/auth/signin?callbackUrl=/checkout"}>
          return to the login page
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
