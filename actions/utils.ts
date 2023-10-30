import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// @ts-ignore
export const getSession = () => getServerSession(authOptions);
