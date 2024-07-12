import pkg, { Types } from "mongoose";
const { Schema, model } = pkg;
import dotenv from "dotenv";
dotenv.config();


const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  tickets: [
    {
      id: {
        type: String,
        required: true,
      },
      price: {
        type: [Number],
        index: "2dsphere",
      },
    },
  ],
});

// EventSchema.set("versionKey", "version");
// EventSchema.plugin(updateIfCurrentPlugin);

// EventSchema.statics.build = (attrs) => {
//   return new Ticket(attrs);
// };

const Event = model("Ticket", EventSchema);
export { Event };
