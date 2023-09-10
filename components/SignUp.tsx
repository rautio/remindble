import React from "react";
import { Brand } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const Signup = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center m-12">
        <div
          className={cn("p-[2px] rounded-md bg-gradient-to-r", Brand.gradient)}
        >
          <Link href="/sign-in">
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
                Sign in
              </span>
            </Button>
          </Link>
        </div>
        <Link href="/sign-up">
          <Button
            variant="ghost"
            className="dark:text-white dark:bg-neutral-950 bg-white"
          >
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r text-lg",
                Brand.gradient,
                `hover:to-${Brand.secondary}`,
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
