"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";

import ShoppingCart from "@/app/(frontend)/_components/ShoppingCart";

import UserButton from "./UserButton";

import MobileMenu from "@/app/(frontend)/_components/MobileMenu";
import { NavigationMenuDemo } from "./ShadcnNavbar";

const MainNavbar = ({ cart, category, subCategory }) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-primary">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-8 px-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} width={70} height={70} alt="Flowbite Logo" />
          </Link>

          <div className="hidden w-full lg:block md:w-auto">
            <NavigationMenuDemo category={category} subCategory={subCategory} />
          </div>

          <div className=" flex gap-2 items-center">
            <ShoppingCart cart={cart} />
            <UserButton />
            <MobileMenu
              category={category}
              pathname={pathname}
              subCategory={subCategory}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavbar;
