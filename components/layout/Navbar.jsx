"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Navbar = ({ children }) => {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-around px-4 items-center py-4">
      {children}
    </nav>
  );
};

export const NavLink = ({ children, href }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "p-2 lg:p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname == href && "bg-background text-foreground"
      )}
    >
      {children}
    </Link>
  );
};
