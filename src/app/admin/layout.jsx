import { redirect } from "next/navigation";

import AdminLayout from "@/components/layouts/AdminLayout";

import useSessionStatus from "@/hooks/useSessionStatus";

async function Layout({ children }) {
  const { status, role } = await useSessionStatus();

  if (status === "unauthenticated") redirect("/login");

  role === "USER" && redirect("/profile");

  return <AdminLayout>{children}</AdminLayout>;
}

export default Layout;
