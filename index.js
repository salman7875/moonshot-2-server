import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import os from "os";

import { checkDBConnection } from "./config/db.config.js";
import cookieParser from "cookie-parser";
import { getCharts, uploadFile } from "./controller/master.controller.js";
import { checkAuthToken } from "./middleware/checkToken.js";
import {
  logIn,
  logout,
  signUp,
  verifyUser,
} from "./controller/user.controller.js";

const app = express();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const tempDir = os.tmpdir();
      cb(null, tempDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

app.use(express.json());
app.use(cors({ origin: "https://moonshot-2.netlify.app", credentials: true }));
app.use(cookieParser());

app.use("/signup", signUp);
app.use("/signin", logIn);
app.use("/verify", checkAuthToken, verifyUser);
app.use("/logout", logout);

app.use("/upload-file", upload.single("file"), uploadFile);
app.use("/chart", checkAuthToken, getCharts);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await checkDBConnection();
  console.log(`Server running on PORT: ${PORT}`);
});
