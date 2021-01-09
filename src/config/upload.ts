import path from "path";
import multer from "multer";

const tempFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  uploadFolder: path.resolve(tempFolder, "uploads"),
  directory: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, fileName, callback) {
      const encode = Math.floor(Math.random() * 98541257);
      const name = `${encode}-${fileName.originalname}`;

      return callback(null, name);
    },
  }),
};
