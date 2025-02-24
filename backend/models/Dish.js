import mongoose from "mongoose";

const dishSchema = mongoose.model(
  "Dishes",
  new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    soldOut: { type: Boolean, default: false },
    image: { type: String, required: true },
    types: { type: [String], required: true },
  })
);

export default dishSchema;
