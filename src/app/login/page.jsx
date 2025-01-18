import { redirect } from "next/navigation";

import LoginPage from "@/components/templates/LoginPage";

import { useAuthentication } from "@/utils/auth";

export const metadata = {
  title: "ورود / ثبت نام | داشبورد نکست",
};

async function Page() {
  const { status, role } = await useAuthentication();

  if (status === "authenticated") {
    role === "ADMIN" ? redirect("/admin") : redirect("/profile");
  }

  return <LoginPage />;
}

export default Page;
