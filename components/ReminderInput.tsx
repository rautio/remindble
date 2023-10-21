"use client";
import React, { useEffect } from "react";
import { parseText, nextDate, crontext } from "crontext";
import { Input } from "@/components/ui/input";
import ErrorBoundary from "./ErrorBoundary";
import { cn } from "@/lib/utils";
import { Brand } from "@/lib/constants";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { createTaskSchema, createTaskSchemaType } from "@/schema/createTask";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTask } from "@/context/api";

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

export function ReminderInput({ useLocal = false }: { useLocal?: boolean }) {
  const router = useRouter();
  const { create } = useTask();
  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { content: "" },
  });
  const { formState, reset } = form;
  const onSubmit = async (data: createTaskSchemaType) => {
    const schedule = parseText(data.content);
    const expires = nextDate(schedule);
    const { repeat } = crontext(data.content);
    const newData = { ...data, expiresAt: expires, repeat };
    try {
      await create(newData);
      toast({
        title: "Success",
        description: "Reminder added succesfully.",
      });
      router.refresh();
    } catch (e: any) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            const { value } = field;
            const schedule = parseText(value);
            const next = nextDate(schedule);
            return (
              <ErrorBoundary>
                <FormItem>
                  <FormLabel>
                    <span
                      className={cn(
                        "text-2xl font-bold bg-clip-text text-transparent",
                        `bg-gradient-to-r from-indigo-500 from-10% to-sky-500`,
                      )}
                    >
                      Remind me to...
                    </span>
                  </FormLabel>
                  <div className="ml-12">
                    <div
                      className={cn(
                        "p-1 rounded-md bg-gradient-to-r",
                        Brand.gradient,
                        `hover:to-${Brand.secondary}`,
                      )}
                    >
                      <FormControl>
                        <Input
                          suppressHydrationWarning
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              form.handleSubmit(onSubmit)();
                            }
                          }}
                          placeholder={getPlaceholder()}
                          className={cn("text-xl p-8 dark:bg-black bg-white")}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
                {value && (
                  <div className="text-sm text-neutral-400 text-center mt-4">
                    Next Occurrence:{" "}
                    <span className="text-neutral-50" suppressHydrationWarning>
                      {next.toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <div className="float-right mt-4 h-24">
                  {field.value && (
                    <div className="flex flex-col">
                      <Button
                        disabled={formState.isSubmitting}
                        className={cn(
                          "text-lg mb-2 p-6",
                          `bg-emerald-500 hover:bg-emerald-700`,
                          `dark:bg-emerald-500 dark:hover:bg-emerald-700`,
                        )}
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        + Add Reminder
                        {formState.isSubmitting && (
                          <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                        )}
                      </Button>
                      <span className="text-xs text-neutral-500 text-right">
                        ...or just press the "Enter" key
                      </span>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            );
          }}
        />
      </form>
    </Form>
  );
}

export default ReminderInput;
