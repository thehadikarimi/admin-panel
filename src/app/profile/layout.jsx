import { redirect } from "next/navigation";

import UserLayout from "@/components/layouts/UserLayout";

import { useAuthentication } from "@/utils/auth";

async function Layout({ children }) {
  const { status, role } = await useAuthentication();

  if (status === "unauthenticated") redirect("/login");

  role === "ADMIN" && redirect("/admin");

  return <UserLayout>{children}</UserLayout>;
}

export default Layout;
