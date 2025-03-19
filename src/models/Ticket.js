import { model, models, Schema } from "mongoose";

const ticketSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["READ", "UNREAD"],
    default: "UNREAD",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  comments: [
    {
      authorId: String,
      image: String,
      comment: String,
      createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },
    },
  ],
});

ticketSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
