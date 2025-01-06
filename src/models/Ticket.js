import { model, models, Schema } from "mongoose";

const ticketSchema = new Schema({
  senderId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  status: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
