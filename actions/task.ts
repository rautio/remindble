"use server";
import prisma from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { getServerSession } from "next-auth";

export async function createTask(data: createTaskSchemaType) {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) {
    // Use local db
    throw new Error("User not found.");
  }
  const { content, expiresAt } = data;
  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
    },
  });
}
export async function bulkCreateTask(tasks: createTaskSchemaType[]) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    // Use local db
    throw new Error("User not found.");
  }
  const newTasks = tasks.map((data) => {
    const { content, expiresAt } = data;
    return {
      userId: user.id,
      content,
      expiresAt,
    };
  });
  return await prisma.task.createMany({ data: newTasks });
}

export async function editTask(id: number, data: createTaskSchemaType) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    throw new Error("User not found.");
  }
  const { content, expiresAt } = data;

  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      userId: user.id,
      content,
      expiresAt,
    },
  });
}

export async function setTaskToDone(id: number) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    throw new Error("User not found.");
  }
  return await prisma.task.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      done: true,
    },
  });
}

export async function deleteTask(id: number) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    throw new Error("User not found.");
  }
  return await prisma.task.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}
