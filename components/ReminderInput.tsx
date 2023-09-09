"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Brand } from "@/lib/constants";
import { Button } from "./ui/button";

const placeholders = [
  "Start the laundry in 2 hours",
  "Order more dog food next month",
  "Switch the laundry to drier in 45 minutes",
  "Call Mom every Sunday at 10am",
  "Wish Joe a Happy Birthday every April 16th",
];

const getPlaceholder = (): string => {
  const len = placeholders.length;
  const idx = Math.floor(Math.random() * len);
  return placeholders[idx];
};

export function ReminderInput() {
  const [content, setContent] = useState("");
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent(e.target.value);
  };
  return (
    <div>
      <span
        className={cn(
          "text-2xl font-bold bg-clip-text text-transparent",
          `bg-gradient-to-r from-indigo-500 from-10% to-sky-500`,
        )}
      >
        Remind me to...
      </span>
      <div
        className={cn(
          "mt-6 ml-12 mb-6 p-1 rounded-md bg-gradient-to-r",
          Brand.gradient,
          `hover:to-${Brand.secondary}`,
        )}
      >
        <Input
          onChange={onChange}
          placeholder={getPlaceholder()}
          className={cn("text-xl p-8 dark:bg-black bg-white")}
        />
      </div>
      <div className="float-right">
        {content && (
          <div className="flex flex-col">
            <Button
              className={cn(
                "text-lg mb-2 p-6",
                `bg-emerald-500 hover:bg-emerald-700`,
                `dark:bg-emerald-500 dark:hover:bg-emerald-700`,
              )}
            >
              + Add Reminder
            </Button>
            <span className="text-xs text-neutral-500 text-right">
              ...or just press the "Enter" key
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReminderInput;
