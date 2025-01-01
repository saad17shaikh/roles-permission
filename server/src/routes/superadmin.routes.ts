import { Router } from "express";
import {
  createAdmin,
  getAllAdmins,
  logoutSuperAdmin,
  superAdminLogin,
} from "../controllers/superadmin.controller";
import { authenticSuperAdmin } from "../middlewares/auth.middleware";


const router = Router();
router
  .post("/login", superAdminLogin)
  .post("/logout", logoutSuperAdmin)
  .post("/create-admin", authenticSuperAdmin, createAdmin)
  .get("/get-admin",authenticSuperAdmin,getAllAdmins)

export default router;
