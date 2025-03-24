import { getServerSession } from "next-auth";

import Category from "@/models/Category";
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

  const categories = await Category.find();

  if (!categories) {
    return Response.json(
      {
        status: 404,
        data: { message: "هیچ دسته بندی یافت نشد." },
      },
      { status: 404 },
    );
  }

  const filterCategoriesData = categories.map((category) => ({
    _id: category._id,
    name: category.name,
    description: category.description,
    userQuantity: category.userQuantity,
  }));

  return Response.json(
    { status: 200, data: { categories: filterCategoriesData } },
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
  const { name, description = "" } = body;

  if (!name) {
    return Response.json(
      {
        status: 422,
        data: { message: "لطفا نام دسته بندی را وارد نمایید." },
      },
      { status: 422 },
    );
  }

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    return Response.json(
      {
        status: 422,
        data: {
          message:
            "دسته بندی با این نام وجود دارد، لطفا نام دیگری را وارد نمایید.",
        },
      },
      { status: 422 },
    );
  }

  await Category.create({ name, description, userQuantity: 0 });

  return Response.json(
    {
      status: 201,
      data: { message: "دسته بندی با موفقیت ایجاد شد." },
    },
    { status: 201 },
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
        data: { _id, message: "لطفا آیدی دسته بندی را به درستی وارد نمایید." },
      },
      { status: 422 },
    );
  }

  const category = await Category.findOne({ _id });
  await User.updateMany(
    { category: category.name },
    { $set: { category: "" } },
  );

  await Category.deleteOne({ _id });

  return Response.json(
    {
      status: 200,
      data: { _id, message: "دسته بندی با موفقیت حذف شد." },
    },
    { status: 200 },
  );
}

export async function PATCH(request) {
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
  const { _id, name, description = "" } = body;

  if (!_id || !name) {
    return Response.json(
      {
        status: 422,
        data: { message: "لطفا اطلاعات را به درستی وارد نمایید." },
      },
      { status: 422 },
    );
  }

  const category = await Category.findOne({ _id });

  category.name = name;
  category.description = description || category.description;

  category.save();

  return Response.json(
    {
      status: 200,
      data: { message: "دسته بندی با موفقیت ویرایش شد." },
    },
    { status: 200 },
  );
}
