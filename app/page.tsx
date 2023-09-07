import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Brand } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
    </>
  );
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
        <p>The simplest reminder app out there.</p>
        <h2>Join the waiting list</h2>
        <p>Sign up here to be the first to hear about our upcoming launch.</p>
        <div className="flex mt-10">
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
                    "bg-clip-text text-transparent bg-gradient-to-r ",
                    Brand.gradient,
                    `hover:to-${Brand.secondary}`,
                  )}
                >
                  Join the waitlist
                </span>
              </Button>
            </Link>
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
