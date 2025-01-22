import { redirect } from "next/navigation";

import useSessionStatus from "@/hooks/useSessionStatus";

export default async function Home() {
  const { status, role } = await useSessionStatus();

  if (status === "unauthenticated") redirect("/login");

  role === "ADMIN" ? redirect("/admin") : redirect("/profile");

  return (
    <div>
      <h1>پنل ادمین و کاربر</h1>
    </div>
  );
}
