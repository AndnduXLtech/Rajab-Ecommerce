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
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.VITE_BASE_URL_PROD
      : process.env.VITE_BASE_URL_DEV,
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

const port = process.env.PORT || 3000;
ViteExpress.listen(app, port, () =>
  console.log("Server is listening on port 3000...")
);
