"use client";
import React, { useTransition, useState } from "react";
import type { Task } from "@prisma/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { deleteTask, setTaskToDone } from "@/actions/task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { TrashIcon } from "@radix-ui/react-icons";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor((expiresAt.getTime() - Date.now()) / 1000 / 60 / 60);

  if (days <= 0) return "text-gray-500 dark:text-gray-300";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-400 dark:text-green-400";
}

export function TaskCard({ task }: { task: Task }) {
  const [isLoading, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  return (
    <div className="flex gap-2 items-start p-2 pl-3 dark:hover:bg-indigo-800 rounded-md group">
      {/* <Checkbox
        id={task.id.toString()}
        className="w-5 h-5"
        checked={task.done}
        disabled={task.done || isLoading}
        onCheckedChange={() => {
          startTransition(async () => {
            await setTaskToDone(task.id);
            router.refresh();
          });
        }}
      /> */}
      <div
        className={cn(
          "text-sm flex-grow font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white leading-9",
        )}
      >
        {editing ? <Input value={task.content} /> : task.content}
        {task.expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400 ",
              getExpirationColor(task.expiresAt),
            )}
          >
            {format(task.expiresAt, "MM/dd/yyyy")}
          </p>
        )}
      </div>
      <Button
        className="hidden group-hover:block"
        variant="ghost"
        onClick={() => setEditing(true)}
      >
        Edit
      </Button>
      <Button className="hidden group-hover:block" variant="ghost">
        <TrashIcon
          onClick={() => {
            deleteTask(task.id);
            router.refresh();
          }}
        />
      </Button>
    </div>
  );
}

export default TaskCard;
