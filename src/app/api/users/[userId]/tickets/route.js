import { getServerSession } from "next-auth";
import { isValidObjectId } from "mongoose";

import Ticket from "@/models/Ticket";

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

  const tickets = isValidId && (await Ticket.find({ userId }));

  if (!tickets) {
    return Response.json(
      {
        status: 404,
        data: { message: "هیچ تیکتی یافت نشد." },
      },
      { status: 404 },
    );
  }

  const filteredTicketsData = tickets.map((ticket) => ({
    _id: ticket._id,
    title: ticket.title,
    updatedAt: ticket.updatedAt,
    status: ticket.status,
  }));

  return Response.json(
    {
      status: 200,
      data: {
        tickets: filteredTicketsData.sort((a, b) => b.updatedAt - a.updatedAt),
      },
    },
    { status: 200 },
  );
}
