"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Brand } from "@/lib/constants";
import { Button } from "./ui/button";
import { CreateCollectionSidebar } from "./CreateCollectionSidebar";

export function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  return (
    <div
      className={cn(
        "w-full rounded-md p-[2px] bg-gradient-to-r",
        Brand.gradient,
      )}
    >
      <Button
        variant="outline"
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
        onClick={(e) => setOpen(true)}
      >
        <span
          className={cn(
            "bg-clip-text text-transparent bg-gradient-to-r",
            Brand.gradient,
            `hover:to-${Brand.secondary}`,
          )}
        >
          Create collection
        </span>
      </Button>
      <CreateCollectionSidebar open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}

export default CreateCollectionBtn;
