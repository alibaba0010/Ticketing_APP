import pkg, { Types } from "mongoose";
const { Schema, model } = pkg;
import dotenv from "dotenv";
dotenv.config();


const TicketSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    price: {
        type: [Number],
        index: "2dsphere",
    },
});
 TicketSchema.set("versionKey", "version");

export default model("Ticket", TicketSchema);