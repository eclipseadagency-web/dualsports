import { ShoppingBagIcon } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice, truncate } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/unknown.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const ShoppingCart = ({ cart }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger aria-label="cart">
          <ShoppingBagIcon className="text-primary-foreground" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart Items</SheetTitle>
            {cart?.size > 0 ? (
              <SheetDescription className="h-full" asChild>
                <div className="flex flex-col">
                  <div>
                    {cart?.cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between my-3">
                        <div>
                          <p>
                            {" "}
                            {truncate(item.productVariation.product.name, 20)}
                          </p>
                          <span>
                            {formatPrice(item.productVariation.sale_price)}
                          </span>
                          x<span>{item.quantity}</span>
                        </div>
                        <div>
                          <Image
                            src={item.productVariation?.images[0]?.url || logo}
                            width={100}
                            height={100}
                            alt="product cart image"
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col items-center my-5">
                      <p>All cart items {cart?.size}</p>
                      <p>
                        subtotal{" "}
                        {cart?.subtotal ? formatPrice(cart?.subtotal) : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </SheetDescription>
            ) : (
              <p className="!my-5 uppercase">there are no items to show</p>
            )}
          </SheetHeader>
          <SheetFooter className={"!justify-center"}>
            <SheetClose asChild>
              <Button asChild variant="outline" size="lg">
                <Link href={"/cart"}>view cart</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild size="lg">
                <Link href={"/checkout"}>Checkout</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShoppingCart;
