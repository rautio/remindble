"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { publicRoutes } from "@/lib/constants";
export const Signout = () => {
  const pathname = usePathname();
  console.log({ pathname });
  // If its a valid public route, stay on the page - otherwise redirect to home
  const callbackUrl = publicRoutes.includes(pathname) ? pathname : "/home";
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl })}>
      <Link href="/">Sign out</Link>
    </DropdownMenuItem>
  );
};

export default Signout;
