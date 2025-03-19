import { getServerSession } from "next-auth";

import Ticket from "@/models/Ticket";
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

  const tickets = await Ticket.find();

  if (!tickets) {
    return Response.json(
      {
        status: 404,
        data: { message: "هیچ تیکتی ثبت نشده است." },
      },
      { status: 404 },
    );
  }

  const filteredTicketsData = tickets.map((ticket) => {
    const user = User.findOne({ _id: ticket.userId });

    return {
      _id: ticket._id,
      userName: user.name,
      title: ticket.title,
      updatedAt: ticket.updatedAt,
      status: ticket.status,
    };
  });

  return Response.json(
    {
      status: 200,
      data: {
        tickets: filteredTicketsData.sort((a, b) => a.updatedAt > b.updatedAt),
      },
    },
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
        data: { _id, message: "لطفا آیدی تیکت را به درستی وارد نمایید." },
      },
      { status: 422 },
    );
  }

  await Ticket.deleteOne({ _id });

  return Response.json(
    {
      status: 200,
      data: { _id, message: "تیکت با موفقیت حذف شد." },
    },
    { status: 200 },
  );
}
