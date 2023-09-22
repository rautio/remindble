"use client";
import { FC } from "react";
import type { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { userSchema } from "@/schema/user";

interface Props {
  user: User;
}

export const UserProfile: FC<Props> = ({ user }) => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  });
  const { formState } = form;
  return (
    <div>
      <h2>Profile</h2>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Email verified: {user.emailVerified ? "True" : "False"} </div>
      <div>Access: {user.access}</div>
      <div>Phone Number: {user.phoneNumber}</div>
      <div>Timezone: {user.timezone}</div>
      <div>Active user since: {new Date(user.createdAt).toDateString()}</div>
    </div>
  );
};

export default UserProfile;
