import pkg, { Types } from "mongoose";
const { Schema, model } = pkg;
import dotenv from "dotenv";
dotenv.config();

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tickets: [
      {
        id: {
          type: String,
        },
        price: {
          type: [Number],
          required: [true, "Please enter a price"],
        },
        quantity: {
          type: Number,
          required: [true, "Please enter a quantity"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Event = model("Event", EventSchema);
export { Event };
