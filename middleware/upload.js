import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const valid = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (valid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;