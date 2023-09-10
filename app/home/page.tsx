import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReminderInput from "@/components/ReminderInput";
import TaskCard from "@/components/TaskCard";
import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import SignUp from "@/components/SignUp";
export default async function Home() {
  const user = await currentUser();
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <ReminderInput useLocal={!user} />
      <SignUp />
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
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Welcome to Remind After!</h1>
        <p>The simplest reminder app out there.</p>
      </div>
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
