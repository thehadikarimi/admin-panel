import { getServerSession } from "next-auth";
import { isValidObjectId } from "mongoose";

import Ticket from "@/models/Ticket";
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

  const { ticketId } = await params;
  const isValidId = isValidObjectId(ticketId);

  const ticket = isValidId && (await Ticket.findOne({ _id: ticketId }));

  if (!ticket) {
    return Response.json(
      {
        status: 404,
        data: { message: "تیکت یافت نشد." },
      },
      { status: 404 },
    );
  }

  const user = await User.findOne({ email: session.user.email });

  if (user.role === "ADMIN") {
    await Ticket.updateOne({ _id: ticketId }, { $set: { status: "READ" } });
    ticket.status = "READ";
  }

  const filterTicketData = {
    _id: ticket._id,
    title: ticket.title,
    status: ticket.status,
    updatedAt: ticket.updatedAt,
    messages: ticket.messages,
  };

  return Response.json(
    { status: 200, data: { ticket: filterTicketData } },
    { status: 200 },
  );
}
