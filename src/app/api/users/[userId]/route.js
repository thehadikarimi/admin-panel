import { getServerSession } from "next-auth";
import { isValidObjectId } from "mongoose";

import User from "@/models/User";
import Category from "@/models/Category";

import { DB_IsConnected } from "@/utils/DB";
import { curYear } from "@/utils/helper";
import { userDefaultYearPayment } from "@/constant/payment";

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

  if (user.role === "USER") {
    const length = user.payments.length;

    if (user.payments[length - 1].year < curYear()) {
      const newPayment = user.payments;

      newPayment.push(userDefaultYearPayment);
      user.payments = newPayment;

      await User.updateOne({ _id: userId }, { $set: { payments: newPayment } });
    }
  }

  const filterUserData = {
    _id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    category: user.category,
    phoneNumber: user.phoneNumber,
    birthDate: user.birthDate,
    payments: user.payments,
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
  const {
    name,
    email,
    password,
    category,
    birthDate,
    phoneNumber,
    updateMonthPayment,
  } = body;

  if (category && category !== user.category) {
    if (user.category) {
      const oldCategory = await Category.findOne({ name: user.category });
      oldCategory.userQuantity--;
      oldCategory.save();
    }

    const newCategory = await Category.findOne({ name: category });
    newCategory.userQuantity++;
    newCategory.save();
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password || user.password;
  user.category = category || user.category;
  user.birthDate = birthDate || user.birthDate;
  user.phoneNumber = phoneNumber || user.phoneNumber;

  user.payments.map((payment) => {
    payment.data.map((month) => {
      if (month._id.toString() === updateMonthPayment?._id) {
        month.status = updateMonthPayment.status;
      }
    });
  });

  user.save();

  return Response.json(
    {
      status: 200,
      data: { message: "کاربر با موفقیت ویرایش شد." },
    },
    { status: 200 },
  );
}
