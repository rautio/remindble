import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReminderInput from "@/components/ReminderInput";
import TaskCard from "@/components/TaskCard";
import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import { Brand } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <ReminderInput />
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();

  if (!user) {
    return (
      <>
        <h1 className="text-4xl font-bold">Welcome to Remind After!</h1>
        <p>The simplest reminder app out there. Try it out!</p>
        <div className="">
          <h2>Create a free account to get reminders.</h2>
          <div className="flex mt-6">
            <div
              className={cn(
                "p-[2px] rounded-md bg-gradient-to-r",
                Brand.gradient,
              )}
            >
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  className="dark:text-white dark:bg-neutral-950 bg-white"
                >
                  <span
                    className={cn(
                      "bg-clip-text text-transparent bg-gradient-to-r text-xl",
                      Brand.gradient,
                      `hover:to-${Brand.secondary}`,
                    )}
                  >
                    Sign up
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br />
        {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}

export async function TaskList() {
  const user = await currentUser();
  let tasks: Task[] = [];
  if (user) {
    tasks = await prisma.task.findMany({
      where: {
        userId: user?.id,
      },
    });
  } else {
    // TODO: Use browser storage for tasks.
  }
  if (tasks.length === 0) return null;
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-indigo-500 dark:text-sky-500 mb-4">
        Upcoming Reminders
      </h1>
      <div className="ml-12 border p-4 border-indigo-500 dark:border-sky-500 rounded-md">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}
