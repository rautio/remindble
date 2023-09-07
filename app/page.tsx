import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <div className="rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 p-[2px]">
            <Link href="/sign-up">
              <Button
                variant="outline"
                className="dark:text-white dark:bg-neutral-950 bg-white"
              >
                <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
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
