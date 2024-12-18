import "dotenv/config";
import mongoose from "mongoose";

console.log(process.env.DB_URI);

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

export default dbConnection;
