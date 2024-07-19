import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import {
  addToGroupController,
  createAccessChatController,
  createGroupController,
  fetchChatsController,
  removeFromGroupController,
  renameGroupController,
} from "../controllers/chat.controller.js";
const router = Router();
router
  .route("/")
  .post(checkAuth, createAccessChatController)
  .get(checkAuth, fetchChatsController);
router.post("/create-group", checkAuth, createGroupController);
router.put("/rename-group", checkAuth, renameGroupController);
router.put("/add-to-group", checkAuth, addToGroupController);
router.put("/remove-from-group", checkAuth, removeFromGroupController);
export default router;
