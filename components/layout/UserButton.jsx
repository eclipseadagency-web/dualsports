"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/public/unknown.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
const UserButton = () => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <Image
                src={user.image ? user.image : logo}
                width={150}
                height={150}
                alt=""
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            {user.role === "ADMIN" && (
              <DropdownMenuItem>
                <Link href={"/admin"}>Admin</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Button
                asChild
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <Link href={"/"}>Logout</Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => signIn()}>Signin</Button>
      )}
    </div>
  );
};

export default UserButton;
