import { ZodError } from "zod";
import { deleteFile } from "./Filuploader";

export async function responseHelper(req, res, callback) {
  try {
    const data = await callback(req);
    return res.json(data);
  } catch (error) {
    console.log(error);
    if (req.files) {
      req.files?.map((file) => {
        deleteFile(file.path);
      });
    }
    let errorMessage = error?.message;
    if (error instanceof ZodError) {
      errorMessage = error;
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      const key = Object.keys(error?.keyValue);
      errorMessage = `This ${key} is already taken.`;
    }

    return res.status(500).json({ error: errorMessage });
  }
}

export async function respose(req, res, next) {
  const data = await next();
  console.log(data);
}
