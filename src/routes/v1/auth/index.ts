import { Router } from "express";

import { signIn, logout } from "../../../controller/v1/auth/index";
import { verifyToken } from "../../../utils/jwt/index";

const router = Router();

router.post("/sign-in", signIn);
router.delete("/logout", verifyToken, logout);

export default router;
