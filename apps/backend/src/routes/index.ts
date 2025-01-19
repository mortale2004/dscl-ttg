import type { Router } from "express";
import express from "express";
import authRoutes from "./auth";
import { routerConfig } from "@dscl-ttg/backend-utils";
const router: Router = express.Router();
router.use(authRoutes);
router.use(routerConfig);

export default router;
