import { getServerSession } from "next-auth";

import Ticket from "@/models/Ticket";
import User from "@/models/User";

import { DB_IsConnected } from "@/utils/DB";
import { deleteFromMega, uploadToMega } from "@/utils/mega";
import upload from "@/utils/multer";

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

  const filteredTicketsData = await Promise.all(
    tickets.map(async (ticket) => {
      const user = await User.findOne({ _id: ticket.userId });

      return {
        _id: ticket._id,
        userName: user.name,
        title: ticket.title,
        updatedAt: ticket.updatedAt,
        status: ticket.status,
      };
    }),
  );

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

  const ticket = await Ticket.findOne({ _id });

  const filesName = ticket.messages.map((message) => message.image.name);

  await Ticket.deleteOne({ _id });
  await deleteFromMega(filesName, "admin-panel");

  return Response.json(
    {
      status: 200,
      data: { _id, message: "تیکت با موفقیت حذف شد." },
    },
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

  const formData = await request.formData();
  const userId = formData.get("userId");
  const title = formData.get("title");
  const message = formData.get("message");
  const image = formData.get("image");

  if (!title || !message) {
    return Response.json(
      {
        status: 422,
        data: { message: "لطفا عنوان و توضیحات را به درستی وارد نمایید." },
      },
      { status: 422 },
    );
  }

  let imageLink = "";
  if (image) {
    const buffer = Buffer.from(await image.arrayBuffer());
    imageLink = await uploadToMega([image, buffer], "admin-panel");
  }

  await Ticket.create({
    userId,
    title,
    status: "UNREAD",
    messages: [
      {
        authorId: userId,
        image: {
          name: image ? image.name : "",
          link: imageLink,
        },
        message,
      },
    ],
  });

  return Response.json(
    {
      status: 201,
      data: { message: "تیکت با موفقیت ارسال شد." },
    },
    { status: 201 },
  );
}
