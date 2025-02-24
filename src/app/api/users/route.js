import { getServerSession } from "next-auth";

import User from "@/models/User";

import { DB_IsConnected } from "@/utils/DB";
import { hashPassword } from "@/utils/password";

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

  const users = await User.find();

  if (!users) {
    return Response.json(
      {
        status: 404,
        data: { message: "هیچ کاربری یافت نشد." },
      },
      { status: 404 },
    );
  }

  const filterUsersData = users.map((user) => ({
    _id: user._id,
    role: user.role,
    name: user.name,
    category: user.category,
    phoneNumber: user.phoneNumber,
    payment: user.payment,
  }));

  return Response.json(
    { status: 200, data: { users: filterUsersData } },
    { status: 200 },
  );
}

export async function DELETE(request) {
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

  const body = await request.json();
  const { _id } = body;

  if (!_id) {
    return Response.json(
      {
        status: 422,
        data: { _id, message: "لطفا آیدی کاربر را به درستی وارد نمایید." },
      },
      { status: 422 },
    );
  }

  await User.deleteOne({ _id });

  return Response.json(
    {
      status: 200,
      data: { _id, message: "کاربر با موفقیت حذف شد." },
    },
    { status: 200 },
  );
}

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

  const session = await getServerSession();

  if (!session) {
    return Response.json(
      { status: 401, data: { message: "لطفا وارد حساب کاربری خود شوید." } },
      { status: 401 },
    );
  }

  const body = await request.json();
  const { name, email, password, phoneNumber, category, payment } = body;

  if (!name) {
    return Response.json(
      {
        status: 422,
        data: { message: "لطفا نام و نام خانوادگی را به درستی وارد نمایید." },
      },
      { status: 422 },
    );
  }

  if (email) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          status: 422,
          data: {
            message:
              "حساب کاربری با این ایمیل وجود دارد. لطفا از یک ایمیل دیگر استفاده کنید.",
          },
        },
        { status: 422 },
      );
    }
  }

  if (email && !password) {
    return Response.json(
      {
        status: 422,
        data: {
          message:
            "لطفا برای افزودن کاربر با ایمیل، گذرواژه را نیز وارد نمایید.",
        },
      },
      { status: 422 },
    );
  }

  const hashedPassword = email && password ? await hashPassword(password) : "";

  await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    category,
    payment,
  });

  return Response.json(
    {
      status: 201,
      data: { message: "حساب کاربری با موفقیت ایجاد شد." },
    },
    { status: 201 },
  );
}
