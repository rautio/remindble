import { getServerSession } from "next-auth/next";
import React, { FC } from "react";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { GearIcon } from "../icons/Gear";
import Signout from "./Signout";
import Signin from "./Signin";

interface NavProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink: FC<NavProps> = (props) => (
  <Link
    className="hover:indigo-500 dark:hover:text-sky-500 text-base leading-9"
    {...props}
  >
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
          {!session && <Signin />}
          {!!session && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <GearIcon title="Settings" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Signout />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default NavBar;
