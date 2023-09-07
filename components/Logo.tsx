import React from "react";
import { Brand } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <h1
      className={cn(
        "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
        Brand.gradient,
      )}
    >
      RemindAfter
    </h1>
  );
}

export default Logo;
