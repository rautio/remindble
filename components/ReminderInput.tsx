import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Brand } from "@/lib/constants";

const placeholders = [
  "Start the laundry in 2 hours",
  "Order more dog food next month",
  "Switch the laundry to drier in 45 minutes",
];

const getPlaceholder = (): string => {
  const len = placeholders.length;
  const idx = Math.floor(Math.random() * len);
  return placeholders[idx];
};

export function ReminderInput() {
  return (
    <div>
      <span
        className={cn(
          "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
          Brand.gradient,
        )}
      >
        Remind me to...
      </span>
      <div
        className={cn(
          "m-6 ml-12 p-1 rounded-md bg-gradient-to-r",
          Brand.gradient,
          `hover:to-${Brand.secondary}`,
        )}
      >
        <Input
          placeholder={getPlaceholder()}
          className={cn("text-xl p-8 bg-black ")}
        />
      </div>
    </div>
  );
}

export default ReminderInput;
