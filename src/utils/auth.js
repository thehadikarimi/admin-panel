import { getServerSession } from "next-auth";

import User from "@/models/User";

// use this function on server-side page.js or nested layout.js
const useAuthentication = async () => {
  const session = await getServerSession();

  if (session) {
    const user = await User.findOne({ email: session.user.email });

    if (user) return { status: "authenticated", role: user.role };
  }

  return { status: "unauthenticated", role: null };
};

export { useAuthentication };
