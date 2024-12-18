import multer from "multer";
import { extname } from "path";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  },
});

export const upload = multer({ storage });

export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted file ${filePath}`);
  } catch (error) {
    console.log(`Error while deleting ${filePath}`);
    console.log(error);
  }
}

export async function checkUploadDir() {
  try {
    const directory = "uploads";
    await fs.mkdir(directory);
    console.log(`Directory '${directory}' created successfully.`);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(`Uploads already exists.`);
    } else {
      console.error(`Error creating directory`, error);
    }
  }
}
