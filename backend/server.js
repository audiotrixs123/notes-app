import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, msg: "Notes API running" }));
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`API http://localhost:${process.env.PORT}`)
    );
  })
  .catch((e) => console.error("MongoDB connection error:", e));
