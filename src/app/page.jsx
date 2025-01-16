import { redirect } from "next/navigation";

import { useAuthentication } from "@/utils/auth";

export default async function Home() {
  const { status, role } = await useAuthentication();

  if (status === "unauthenticated") redirect("/login");

  role === "ADMIN" ? redirect("/admin") : redirect("/profile");

  return (
    <div>
      <h1>پنل ادمین و کاربر</h1>
    </div>
  );
}
