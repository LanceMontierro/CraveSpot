import { getDishes } from "../controllers/dishController.js";
import express from "express";

const dishRoutes = express.Router();

dishRoutes.get("/get-dishes", getDishes);

export default dishRoutes;
