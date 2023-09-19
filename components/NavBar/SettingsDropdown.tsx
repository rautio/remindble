import React from "react";
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
import { GearIcon } from "../icons/Gear";
import Signout from "./Signout";

export const SettingsDropdown = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:indigo-500 dark:hover:text-sky-500">
        <GearIcon title="Settings" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
            <Link href="/settings#profile">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Signout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
