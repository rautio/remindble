import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";

export async function AvatarImg() {
  const session = await getServerSession();
  const initials = (session?.user?.email as string).charAt(0).toUpperCase();
  const src = session?.user?.image as string;
  const alt = session?.user?.email as string;
  // TODO Get User's first name and last name
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

export default AvatarImg;
