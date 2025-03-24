import { getServerSession } from "next-auth";

import User from "@/models/User";

import { DB_IsConnected } from "@/utils/DB";

export async function GET() {
  const isConnected = await DB_IsConnected();
  if (isConnected === "not-connected") {
    return Response.json(
      {
        status: 500,
        data: { message: "خطا در هنگام اتصال به دیتابیس." },
      },
      { status: 500 },
    );
  }

  const session = await getServerSession();

  if (!session) {
    return Response.json(
      { status: 401, data: { message: "لطفا وارد حساب کاربری خود شوید." } },
      { status: 401 },
    );
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return Response.json(
      {
        status: 404,
        data: { message: "حساب کاربری یافت نشد، لطفا ابتدا ثبت نام کنید." },
      },
      { status: 404 },
    );
  }

  const filterUserData = {
    _id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    category: user.category,
    birthDate: user.birthDate,
    payments: user.payments,
  };

  return Response.json(
    { status: 200, data: { user: filterUserData } },
    { status: 200 },
  );
}
