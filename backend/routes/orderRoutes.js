import {
  submitOrder,
  getOrderDetails,
} from "./../controllers/orderController.js";

import express from "express";

const orderRoutes = express.Router();

orderRoutes.post("/submit-order-details", submitOrder);
orderRoutes.get("/get-order-details/:username", getOrderDetails);
export default orderRoutes;
