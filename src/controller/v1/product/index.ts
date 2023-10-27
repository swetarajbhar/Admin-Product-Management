import { Request, Response, NextFunction, response } from "express";

import { addProductService } from "../../../service/v1/product/index";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const response = await addProductService({ body, files });
    const responseRecieved = response ? 200 : 400;
    const responseMessage =
      responseRecieved === 200 ? "Product Added" : "Product Not Added";
    return res.status(responseRecieved).send({
      message: responseMessage,
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something Went Wrong",
    });
  }
};
