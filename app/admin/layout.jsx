import { auth } from "@/auth";
import { Navbar, NavLink } from "@/components/layout/Navbar";
import UserButton from "@/components/layout/UserButton";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }) => {
  const { user } = await auth();

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }
  if (user.role !== "ADMIN") {
    return (
      <div>
        <p>you are not authorized to view this page</p>
        <Link href="/">back to homepage</Link>
      </div>
    );
  }
  return (
    <>
      <div>
        <Navbar>
          <div>
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/admin/category">Category</NavLink>
            <NavLink href="/admin/product">Product</NavLink>
            <NavLink href="/admin/order">Order</NavLink>
          </div>

          <UserButton />
        </Navbar>
      </div>

      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
