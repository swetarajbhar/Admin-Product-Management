import { Router } from "express";
import { addProduct } from "../../../controller/v1/product/index";
import { verifyToken } from "../../../utils/jwt/index";

import multer from "multer";
const upload = multer();

const router = Router();

router.post("/add", upload.array("images", 5), verifyToken, addProduct);

export default router;
