"use server";
import prisma from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
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

export async function setTaskToDone(id: number) {
  const user = await currentUser();

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
  const user = await currentUser();

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
