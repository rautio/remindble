import prisma from "@/lib/prisma";
import { userSchema } from "@/schema/user";
import { getSession } from "./utils";

export const getUserProfile = async () => {
  const session = await getSession();
  // @ts-ignore
  if (!session?.user?.id) {
    throw new Error("User not found.");
  }
  return await prisma.user.findUnique({
    where: {
      // @ts-ignore
      id: session.user.id,
    },
  });
};

export const getUserAccount = async () => {
  const session = await getSession();
  // @ts-ignore
  if (!session?.user?.id) {
    throw new Error("User not found.");
  }
  return await prisma.account.findFirst({
    where: {
      // @ts-ignore
      userId: session.user.id,
    },
  });
};
