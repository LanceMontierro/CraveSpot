import express from "express";

import {
  saveUserEmail,
  getAllUserDetails,
  addToCart,
  removeItem,
  updateItemQuantity,
  toggleFavorite,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/save-user-email", saveUserEmail);
userRoutes.get("/get-all-usersDetails", getAllUserDetails);
userRoutes.post("/toggle-favorite", toggleFavorite);
userRoutes.patch("/change-quantity/:name", updateItemQuantity);
userRoutes.delete("/remove-from-cart/:name", removeItem);
userRoutes.post("/add-to-cart", addToCart);

export default userRoutes;
