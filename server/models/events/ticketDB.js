import pkg, { Types } from "mongoose";
const { Schema, model } = pkg;
import dotenv from "dotenv";
dotenv.config();

const TicketSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    eventId: {
      type: Types.ObjectId,
      required: true,
      ref: "Event",
    },
    ticketId: {
      type: String,
      required: true,
    },
    price: {
      type: [Number],
      index: "2dsphere",
    },
  },
  { timestamps: true }
);

export default model("Ticket", TicketSchema);
