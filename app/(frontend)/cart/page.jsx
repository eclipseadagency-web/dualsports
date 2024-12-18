import { getCart } from "@/lib/cart";
import React from "react";
import CartItem from "./_components/CartItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const CartPage = async () => {
  const cart = await getCart();

  if (!cart || cart?.cartItems.length < 1) {
    return (
      <div className="flex items-center flex-col mt-20 gap-5">
        <p className=" text-3xl capitalize mt-20">there are no items to show</p>
        <Button asChild>
          <Link href="/">Go Shopping</Link>
        </Button>
      </div>
    );
  }
  return (
    <>
      <section>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cart?.cartItems.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(cart?.subtotal)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>free</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>free</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>{formatPrice(cart?.subtotal)}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <Button asChild>
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
    </>
  );
};

export default CartPage;
