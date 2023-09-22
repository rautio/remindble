import prisma from "@/lib/prisma";
import { userSchema } from "@/schema/user";
import { getSession } from "./utils";

export const getUserProfile = async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error("User not found.");
  }
  return await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
};
