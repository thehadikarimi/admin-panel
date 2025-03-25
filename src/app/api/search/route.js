import { getServerSession } from "next-auth";

import User from "@/models/User";
import Ticket from "@/models/Ticket";
import Category from "@/models/Category";

import { DB_IsConnected } from "@/utils/DB";

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
  const { q } = body;

  if (!q) {
    return Response.json(
      {
        status: 422,
        data: { message: "لطفا متن جستجو را وارد نمایید." },
      },
      { status: 422 },
    );
  }

  const users = await User.find();
  const tickets = await Ticket.find();
  const categories = await Category.find();

  const fUsers = [];

  users
    .filter(
      (user) => user.email !== session.user.email && user.name.includes(q),
    )
    .map((user) => {
      fUsers.push({
        _id: user._id,
        title: user.name,
        link: `/admin/users/${user._id}`,
      });
    });

  const fTickets = [];
  tickets
    .filter((ticket) => ticket.title.includes(q))
    .map((ticket) => {
      fTickets.push({
        _id: ticket._id,
        title: ticket.title,
        link: `/admin/tickets/${ticket._id}`,
      });
    });

  const fCategories = [];
  categories
    .filter((category) => category.name.includes(q))
    .map((category) => {
      fCategories.push({
        _id: category._id,
        title: category.name,
        link: "/admin/category/",
      });
    });

  return Response.json(
    {
      status: 200,
      data: {
        searchResult:
          !fUsers.length && !fTickets.length && !fCategories.length
            ? []
            : [
                { label: "کاربران", data: fUsers },
                { label: "تیکت ها", data: fTickets },
                { label: "دسته بندی ها", data: fCategories },
              ],
      },
    },
    { status: 200 },
  );
}
