import { Router } from "express";

import { signIn } from "../../../controller/v1/auth/index";

const router = Router();

router.post("/sign-in", signIn);

export default router;
