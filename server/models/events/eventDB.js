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
      required: [true, "Please select a date"],
    },
    isAvailale: {
      type: Boolean,
      default: true,
    },
    tickets: [
      {
        id: {
          type: String,
        },
        price: {
          type: Number,
          required: [true, "Please enter a price"],
        },
        quantity: {
          type: Number,
          required: [true, "Please enter a quantity"],
        },
        isBooked: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("Event", EventSchema);
