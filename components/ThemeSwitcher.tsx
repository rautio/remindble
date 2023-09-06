"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  // in this trick we are avoiding hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border dark:border-neutral-800 dark:bg-[#030303]">
        <TabsTrigger value="light">
          <SunIcon
            className="h-[1.2rem] w-[1.2rem]"
            onClick={(e) => setTheme("light")}
          />
        </TabsTrigger>
        <TabsTrigger value="dark">
          <MoonIcon
            className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0"
            onClick={(e) => setTheme("dark")}
          />
        </TabsTrigger>
        <TabsTrigger value="system">
          <DesktopIcon
            className="h-[1.2rem] w-[1.2rem]"
            onClick={(e) => setTheme("system")}
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitcher;
