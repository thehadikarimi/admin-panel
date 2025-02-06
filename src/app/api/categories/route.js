import { getServerSession } from "next-auth";

import Category from "@/models/Category";

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
    slug: category.slug,
    userQuantity: category.userQuantity,
  }));

  return Response.json(
    { status: 200, data: { categories: filterCategoriesData } },
    { status: 200 },
  );
}
