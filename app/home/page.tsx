import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReminderInput from "@/components/ReminderInput";
import TaskCard from "@/components/TaskCard";
import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";
import SignUp from "@/components/SignUp";
import IndexedTaskList from "@/components/IndexedTaskList";
import { SyncTasks } from "@/context/api";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Home() {
  const session = await getServerSession();
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <ReminderInput useLocal={!session} />
      {!session && <SignUp />}
      <Suspense fallback={<div>Loading tasks...</div>}>
        {session ? <TaskList /> : <IndexedTaskList />}
      </Suspense>
    </>
  );
}

async function WelcomeMsg() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Welcome to Remindble!</h1>
        <p>Free the clutter from your mind by writing it down.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br />
        firstName lastName
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
  const session = await getServerSession(authOptions);
  let tasks: Task[] = [];
  if (session?.user?.id) {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
      },
    });
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
        {/* <SyncTasks tasks={tasks} /> */}
      </div>
    </div>
  );
}
