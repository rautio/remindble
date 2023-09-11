import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Brand } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Home from "./home/page";

export default async function Main() {
  return <Home />;
}
