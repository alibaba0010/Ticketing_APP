import { Schema, model, Model, Document } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";




const TicketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

TicketSchema.set('versionKey', 'version');
TicketSchema.plugin(updateIfCurrentPlugin);

TicketSchema.statics.build = (attrs) => {
  return new Ticket(attrs);
};

const Ticket = model("Ticket", TicketSchema);
export { Ticket };