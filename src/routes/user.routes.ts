import { Router } from "express";
import {
  createRoles,
  createUsers,
  logoutUser,
  userLogin,
} from "../controllers/admin.controller";
import { authenticUser } from "../middlewares/auth.middleware";
const router = Router();

router
  .post("/login", userLogin)
  .post("/logout", authenticUser, logoutUser)
  .post("/create-role", authenticUser, createRoles)
  .post("/create-user", authenticUser, createUsers);

export default router;
