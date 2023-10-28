import { Router } from "express";
import {
  addProduct,
  listProducts,
  findProduct,
  deleteProduct,
  updateProduct,
} from "../../../controller/v1/product/index";
import { verifyToken } from "../../../utils/jwt/index";

import multer from "multer";
const upload = multer();

const router = Router();

router.post("/add", upload.array("images", 5), verifyToken, addProduct);
router.post("/list", listProducts);
router.get("/:sku", findProduct);
router.delete("/:sku", deleteProduct);
router.put("/:sku", upload.array("images", 5), verifyToken, updateProduct);

export default router;
