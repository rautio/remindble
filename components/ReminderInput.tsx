import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Brand } from "@/lib/constants";

export function ReminderInput() {
  return (
    <div className="m-12">
      <Input placeholder="Remind me to..." className={cn("text-xl p-8")} />
    </div>
  );
}

export default ReminderInput;
