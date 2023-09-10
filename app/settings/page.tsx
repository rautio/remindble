import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReminderInput from "@/components/ReminderInput";
import TaskCard from "@/components/TaskCard";
import prisma from "@/lib/prisma";

export default async function Settings() {
  return <>Settings</>;
}
