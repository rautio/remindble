import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const Signup = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center m-12">
        <div
          className={cn(
            "p-[2px] rounded-md bg-gradient-to-r",
            "from-indigo-500 from-10% to-sky-500 to-90%",
          )}
        >
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="dark:text-white dark:bg-neutral-950 bg-white"
            >
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r text-xl",
                  "from-indigo-500 from-10% to-sky-500 to-90%",
                  "hover:bg-indigo-500 dark:hover:bg-sky-500",
                )}
              >
                Sign in
              </span>
            </Button>
          </Link>
        </div>
        <Link href="/sign-up">
          <Button
            variant="ghost"
            className="dark:text-white dark:bg-neutral-950 bg-white group"
          >
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r text-lg",
                "from-sky-500 from-10% to-emerald-500 to-90%",
              )}
            >
              Create account
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
