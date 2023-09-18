"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export const SignIn = () => (
  <Button
    variant="ghost"
    className="hover:indigo-500 dark:hover:text-sky-500 text-base"
    onClick={() => signIn()}
  >
    Sign In
  </Button>
);

export default SignIn;
