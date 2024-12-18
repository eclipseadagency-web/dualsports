"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      <Link
        href="/profile"
        className={cn(
          "border px-4 py-3 text-center uppercase font-bold duration-300",
          pathname == "/profile"
            ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            : "bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground"
        )}
      >
        dashboard
      </Link>
      <Link
        className={cn(
          "border px-4 py-3 text-center uppercase font-bold duration-300",
          pathname == "/profile/orders"
            ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            : "bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground"
        )}
        href="/profile/orders"
      >
        Orders
      </Link>
    </nav>
  );
};

export default ProfileNavbar;
