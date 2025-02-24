import express from "express";
import cors from "cors";
import dishRoutes from "./routes/dishRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dishes", dishRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
