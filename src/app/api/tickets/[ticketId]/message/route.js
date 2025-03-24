import { getServerSession } from "next-auth";
import { isValidObjectId } from "mongoose";

import Ticket from "@/models/Ticket";
import User from "@/models/User";

import { DB_IsConnected } from "@/utils/DB";
import { uploadToMega } from "@/utils/mega";
import upload from "@/utils/multer";

export async function POST(request, { params }) {
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

  const formData = await request.formData();
  const authorId = formData.get("authorId");
  const message = formData.get("message");
  const image = formData.get("image");

  if (!message) {
    return Response.json(
      {
        status: 422,
        data: { message: "لطفا توضیحات را به درستی وارد نمایید." },
      },
      { status: 422 },
    );
  }

  let imageLink = "";
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    imageLink = await uploadToMega([image, buffer], "admin-panel");
  }

  const user = await User.findOne({ _id: ticket.userId });

  if (user.role !== "ADMIN") {
    ticket.status = "UNREAD";
  }

  ticket.messages.push({
    authorId,
    image: {
      name: image ? image.name : "",
      link: imageLink,
    },
    message,
  });

  ticket.save();

  return Response.json(
    {
      status: 201,
      data: { message: "تیکت با موفقیت ارسال شد." },
    },
    { status: 201 },
  );
}
