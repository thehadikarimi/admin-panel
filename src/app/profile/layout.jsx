import { redirect } from "next/navigation";

import UserLayout from "@/components/layouts/UserLayout";

import useSessionStatus from "@/hooks/useSessionStatus";

async function Layout({ children }) {
  const { status, role } = await useSessionStatus();

  if (status === "unauthenticated") redirect("/login");

  role === "ADMIN" && redirect("/admin");

  return <UserLayout>{children}</UserLayout>;
}

export default Layout;
