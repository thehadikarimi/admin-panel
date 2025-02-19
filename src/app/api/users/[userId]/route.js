import { getServerSession } from "next-auth";
import { isValidObjectId } from "mongoose";

import User from "@/models/User";

import { DB_IsConnected } from "@/utils/DB";

export async function GET(request, { params }) {
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

  const { userId } = await params;
  const isValidId = isValidObjectId(userId);

  const user = isValidId && (await User.findOne({ _id: userId }));

  if (!user) {
    return Response.json(
      {
        status: 404,
        data: { message: "کاربر یافت نشد." },
      },
      { status: 404 },
    );
  }

  const filterUserData = {
    _id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    category: user.category,
    phoneNumber: user.phoneNumber,
    birthDate: user.birthDate,
    payment: user.payment,
  };

  return Response.json(
    { status: 200, data: { user: filterUserData } },
    { status: 200 },
  );
}

export async function PATCH(request, { params }) {
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

  const { userId } = await params;
  const isValidId = isValidObjectId(userId);

  const user = isValidId && (await User.findOne({ _id: userId }));

  if (!user) {
    return Response.json(
      {
        status: 404,
        data: { message: "کاربر یافت نشد." },
      },
      { status: 404 },
    );
  }

  const body = await request.json();
  const { name, email, password, category, birthDate, phoneNumber } = body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password || user.password;
  user.category = category || user.category;
  user.birthDate = birthDate || user.birthDate;
  user.phoneNumber = phoneNumber || user.phoneNumber;

  user.save();

  return Response.json(
    {
      status: 200,
      data: { message: "کاربر با موفقیت ویرایش شد." },
    },
    { status: 200 },
  );
}
