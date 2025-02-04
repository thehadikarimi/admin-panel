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
