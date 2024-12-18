"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/next.svg";
import { cn } from "@/lib/utils";
const MobileMenu = ({ category, pathname, subCategory }) => {
  return (
    <div className="mobileMenu">
      <Sheet>
        <SheetTrigger>
          <MenuIcon
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary-foreground rounded-lg lg:hidden hover:bg-background hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="mobile menu"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Image src={logo} width={"100"} height={"100"} alt="logo" />
            </SheetTitle>
            <SheetDescription asChild>
              <div className=" flex flex-col py-2 mt-4 items-start">
                <SheetClose asChild>
                  <div className="w-full border-b border-1 border-b-[hsl(var(--border))]">
                    <Link className="hover:underline py-4 block" href={"/"}>
                      Home
                    </Link>
                  </div>
                </SheetClose>

                {category.map((c) => {
                  const thisCategorySubcategories = subCategory.filter(
                    (sub) => sub.categoryId == c.id
                  );

                  return (
                    <div key={c.id} className="w-full ">
                      {thisCategorySubcategories.length > 0 ? (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>{c.name}</AccordionTrigger>
                            {thisCategorySubcategories.map((sub) => (
                              <AccordionContent key={sub.id}>
                                <SheetClose asChild>
                                  <Link href="/">{sub.name}</Link>
                                </SheetClose>
                              </AccordionContent>
                            ))}
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <SheetClose asChild>
                          <Link
                            href="/"
                            className="hover:underline py-4 block border-b border-1 border-b-[hsl(var(--border))]"
                          >
                            {c.name}
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  );
                })}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
