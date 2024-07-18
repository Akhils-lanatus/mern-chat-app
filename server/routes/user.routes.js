import { Router } from "express";
import { getUsersControllers } from "../controllers/user.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/all-users", checkAuth, getUsersControllers);

export default router;
