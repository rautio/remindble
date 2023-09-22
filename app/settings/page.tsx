import { getUserProfile } from "@/actions/user";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import UserProfile from "@/components/UserProfile";

export default async function Settings() {
  const profile = await getUserProfile();
  return (
    <div>
      <h1>Settings</h1>
      <ThemeSwitcher />
      <UserProfile user={profile} />
    </div>
  );
}
