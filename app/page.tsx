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

async function WelcomeMsg() {
  const user = await currentUser();

  if (user) {
    redirect("/home");
  }

  return (
    <div className="width: 75%">
      <div className="flex flex-col w-full mb-12">
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
      </div>
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
