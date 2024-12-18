import { Router } from "express";

import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import productRouter from "./Routes/product.route.js";
import userActivitiesRouter from "./Routes/useractivities.routes.js";
const v1Route = Router();
v1Route.use("/auth", authRouter);
v1Route.use("/user", userRouter);
v1Route.use("/product", productRouter);
v1Route.use("/useractivities", userActivitiesRouter);

export { v1Route };
