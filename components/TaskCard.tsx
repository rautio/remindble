"use client";
import React, { useState } from "react";
import type { Task } from "@prisma/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";
import { deleteTask, editTask } from "@/actions/task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
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
import { TrashIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "@/schema/createTask";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor((expiresAt.getTime() - Date.now()) / 1000 / 60 / 60);

  if (days <= 0) return "text-gray-500 dark:text-gray-300";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-400 dark:text-green-400";
}

export function TaskCard({ task }: { task: Task }) {
  const [edit, setEdit] = useState(false);
  const form = useForm<Task>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { ...task, expiresAt: task.expiresAt || undefined },
  });
  const { formState } = form;
  const onSubmit = async (data: Task) => {
    const { id } = task;
    const { content, expiresAt } = data;
    try {
      await editTask(id, { content, expiresAt: expiresAt || undefined });
      router.refresh();
      setEdit(false);
      toast({
        title: "Success",
        description: "Reminder edited succesfully.",
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };
  const router = useRouter();
  return (
    <div className="flex gap-2 items-start p-2 pl-3 hover:bg-indigo-100 dark:hover:bg-sky-800 rounded-md group">
      <div
        className={cn(
          "text-sm flex-grow font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white leading-9",
        )}
      >
        {task.content}
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
      <Dialog
        open={edit}
        onOpenChange={(newOpen: boolean) => {
          setEdit(newOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="hidden group-hover:block bg-indigo-300 hover:bg-indigo-400 dark:bg-sky-600 dark:hover:bg-sky-700"
            variant="ghost"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form>
              <DialogHeader>
                <DialogTitle>Edit Reminder</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input
                        suppressHydrationWarning
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        className={cn("text-xl p-8 dark:bg-black bg-white")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormMessage />
              <DialogFooter className="mt-6">
                <Button
                  disabled={formState.isSubmitting}
                  className="bg-indigo-500 hover:bg-indigo-600 dark:bg-sky-600 dark:hover:bg-sky-700"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit(onSubmit)();
                  }}
                >
                  Save changes
                  {formState.isSubmitting && (
                    <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="hidden group-hover:block hover:bg-indigo-300 dark:hover:bg-sky-700"
            variant="ghost"
          >
            <TrashIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Reminder</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this reminder? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter className="mt-6">
            <Button
              disabled={formState.isSubmitting}
              type="submit"
              onClick={() => {
                deleteTask(task.id);
                router.refresh();
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskCard;
