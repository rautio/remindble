import React from "react";
import { Brand } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import SvgLogo from "@/public/remindble-logo-bg.svg";

export function Logo() {
  return (
    <Link href="/home">
      <h1
        className={cn(
          "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r flex",
          Brand.gradient,
        )}
      >
        Remindble
        <Image
          className="pl-[6px]"
          width={30}
          height={30}
          priority
          src={SvgLogo}
          alt="Remindble"
        />
      </h1>
    </Link>
  );
}

export default Logo;
