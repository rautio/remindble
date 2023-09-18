import { getServerSession } from "next-auth/next";
import React, { FC } from "react";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";
import { GearIcon } from "./icons/Gear";

interface NavProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: FC<NavProps> = (props) => (
  <Link className="hover:indigo-500 dark:hover:text-sky-500" {...props}>
    {props.children}
  </Link>
);

export async function NavBar() {
  const session = await getServerSession();
  return (
    <nav className="flex w-full items-center justify-center p-4 px-8 h-[60px]">
      <div className="flex flex-row flex-grow justify-start items-center w-full space-x-6">
        <Logo />
        <NavLink href="/home">Home</NavLink>
        {!!session && <NavLink href="/groups">Groups</NavLink>}
        <div className="flex flex-grow justify-end space-x-6 pr-6">
          <NavLink href="/about">About</NavLink>
          {!session && <NavLink href="/sign-in">Sign In</NavLink>}
          {!!session && (
            <NavLink href="/settings">
              <GearIcon title="Settings" />
            </NavLink>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        {!!session && <div>User</div>}
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default NavBar;
