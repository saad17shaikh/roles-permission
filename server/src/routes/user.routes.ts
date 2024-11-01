import { Router } from "express";
import {
  allRoles,
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
  // Role
  .post("/create-role", authenticUser, createRoles)
  .get("/get-roles", authenticUser, allRoles)
  // users
  .post("/create-user", authenticUser, createUsers);

export default router;
