import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";
import cookieParser from "cookie-parser";
import dbConnection from "./config/dbconnection.js";
import userRoutes from "./Routes/user.routes.js";
import cors from "cors";
import { v1Route } from "./index.js";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

const corsOptions = {
  origin: process.env.VITE_BASE_URL_PROD || "http://localhost:5173", // Use process.env to access environment variables
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

app.get("/hoi", (req, res) => {
  res.send("Hello World");
});

app.use("/api", v1Route);
// ViteExpress.listen(app, 3000, () =>
//   console.log("Server is listening on port 3000...")
// );

const host =
  process.env.VITE_BASE_URL_PROD && process.env.VITE_BASE_URL_PROD.trim() !== ""
    ? process.env.VITE_BASE_URL_PROD
    : "http://localhost";

const port =
  process.env.VITE_BASE_URL_PROD && process.env.VITE_BASE_URL_PROD.trim() !== ""
    ? 80 // Default HTTP port for live environments
    : 3000; // Default port for local development

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on ${host}:${port}...`)
);
