import { getServerSession } from "next-auth";

import User from "@/models/User";

import { DB_IsConnected } from "./DB";

// use this function on server-side page.js or nested layout.js
const useAuthentication = async () => {
  const isConnected = await DB_IsConnected();

  if (isConnected === "not-connected") {
    return { status: "unauthenticated", role: null };
  }

  const session = await getServerSession();

  if (session) {
    try {
      const user = await User.findOne({ email: session.user.email });
      if (user) return { status: "authenticated", role: user.role };
    } catch (err) {
      console.log(err);
    }
  }

  return { status: "unauthenticated", role: null };
};

export { useAuthentication };
