import { Router } from "express";
import {
  createAdmin,
  logoutSuperAdmin,
  superAdminLogin,
} from "../controllers/superadmin.controller";
import { authenticSuperAdmin } from "../middlewares/auth.middleware";

const router = Router();
router
  .post("/login", superAdminLogin)
  .post("/logout", logoutSuperAdmin)
  .post("/create-admin", authenticSuperAdmin, createAdmin);

export default router;
