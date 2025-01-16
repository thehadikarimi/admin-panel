import { redirect } from "next/navigation";

import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";

import { useAuthentication } from "@/utils/auth";

async function Layout({ children }) {
  const { status, role } = await useAuthentication();

  if (status === "unauthenticated") redirect("/login");

  role === "USER" && redirect("/profile");

  return <AdminLayout>{children}</AdminLayout>;
}

export default Layout;
