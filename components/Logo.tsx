import React from "react";
import { Brand } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/home">
      <h1
        className={cn(
          "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
          Brand.gradient,
        )}
      >
        Remindble
      </h1>
    </Link>
  );
}

export default Logo;
