import { Router } from "express";
import { uploads } from "../middleware/multer.middleware.js";
import { handleMulterError } from "../middleware/multerError.middleware.js";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller.js";
const router = Router();

router.post(
  "/register",
  uploads.single("avatar"),
  handleMulterError,
  registerUserController
);
router.post("/login", loginUserController);

export default router;
