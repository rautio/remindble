import { UserButton, currentUser } from "@clerk/nextjs";
import React from "react";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function NavBar() {
  const user = currentUser();
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">
        {!!user && <UserButton afterSignOutUrl="/" />}
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default NavBar;
