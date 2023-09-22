"use client";

import type { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { userSchema } from "@/schema/user";

export const UserProfile = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  });
  const { formState } = form;
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

export default UserProfile;
