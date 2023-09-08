import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Brand } from "@/lib/constants";

export function ReminderInput() {
  return (
    <div
      className={cn(
        "m-12 p-1 rounded-md bg-gradient-to-r",
        Brand.gradient,
        `hover:to-${Brand.secondary}`,
      )}
    >
      <Input
        placeholder="Remind me to..."
        className={cn("text-xl p-8 bg-black ")}
      />
    </div>
  );
}

export default ReminderInput;
