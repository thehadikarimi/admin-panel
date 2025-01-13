import User from "@/models/User";

import { DB_IsConnected } from "@/utils/DB";
import { hashPassword } from "@/utils/password";

export async function POST(request) {
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

  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return Response.json(
      {
        status: 422,
        data: { message: "لطفا اطلاعات را به صورت صحیح وارد کنید." },
      },
      { status: 422 },
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return Response.json(
      {
        status: 422,
        data: {
          message:
            "حساب کاربری وجود دارد، در قسمت ورود وارد حساب کاربری خود شوید.",
        },
      },
      { status: 422 },
    );
  }

  const hashedPassword = await hashPassword(password);

  await User.create({ name, email, password: hashedPassword });

  return Response.json(
    {
      status: 201,
      data: { message: "حساب کاربری با موفقیت ایجاد شد." },
    },
    { status: 201 },
  );
}
