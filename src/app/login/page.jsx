import { redirect } from "next/navigation";

import LoginPage from "@/components/templates/LoginPage";

import useSessionStatus from "@/hooks/useSessionStatus";

export const metadata = {
  title: "ورود / ثبت نام | داشبورد نکست",
};

async function Page() {
  const { status, role } = await useSessionStatus();

  if (status === "authenticated") {
    role === "ADMIN" ? redirect("/admin") : redirect("/profile");
  }

  return <LoginPage />;
}

export default Page;
