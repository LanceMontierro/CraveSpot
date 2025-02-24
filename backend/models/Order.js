import mongoose from "mongoose";

const OrderSchema = mongoose.model(
  "Orders",
  new mongoose.Schema({
    orderDetails: { type: [Object], required: true },
    date: { type: Date, default: Date.now },
  })
);


export default OrderSchema;