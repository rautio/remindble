"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex justify-center">
      <Button onClick={() => signOut()} />
    </div>
  );
}
