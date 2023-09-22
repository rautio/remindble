import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import UserProfile from "@/components/UserProfile";

export default async function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <ThemeSwitcher />
      <UserProfile />
    </div>
  );
}
