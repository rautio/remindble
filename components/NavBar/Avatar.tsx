import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";

const getInitials = (session: Session | null): string => {
  if (!session) return "";
  if (session?.user?.name) {
    const names = session.user.name.split(" ");
    return names.reduce((pre, cur) => pre + cur[0], "");
  }
  return (session?.user?.email as string).charAt(0).toUpperCase();
};

export async function AvatarImg() {
  const session = await getServerSession();
  const initials = getInitials(session);
  const src = session?.user?.image as string;
  const alt = session?.user?.email as string;
  // TODO Get User's first name and last name
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} referrerPolicy="no-referrer" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

export default AvatarImg;
