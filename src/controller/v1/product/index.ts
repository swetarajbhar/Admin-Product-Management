import { Request, Response, NextFunction } from "express";

import {
  addProductService,
  listProductService,
  findProductService,
  deleteProductService,
  updateProductService,
} from "../../../service/v1/product/index";

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
      statusCode: responseRecieved,
      message: responseMessage,
      data: response,
    });
  } catch (error) {
    const isDuplicateKeyError =
      error instanceof Error &&
      "code" in error &&
      (error as any).code === 11000;
    console.log("isDuplicateKeyError :", isDuplicateKeyError);
    const errorResponse = isDuplicateKeyError ? 409 : 500;
    const errorMessage = isDuplicateKeyError
      ? "Product Already Added"
      : "Something Went Wrong";

    return res.status(errorResponse).send({
      statusCode: errorResponse,
      message: errorMessage,
      data: error,
    });
  }
};

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const response = await listProductService({ body });
    const responseRecieved = response ? 200 : 400;
    const responseMessage =
      responseRecieved === 200 ? "Products Fetched" : "Products Not Found";
    return res.status(responseRecieved).send({
      statusCode: responseRecieved,
      message: responseMessage,
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Something Went Wrong",
      data: error,
    });
  }
};

export const findProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sku } = req.params;
    const response = await findProductService({ sku });
    const responseReceived = response ? 200 : 404;
    return res.status(responseReceived).send({
      statusCode: responseReceived,
      message: responseReceived === 200 ? "Product Found" : "Product Not Found",
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Something Went Wrong",
      data: error,
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sku } = req.params;
    const response = await deleteProductService({ sku });
    const responseReceived = response ? 200 : 404;
    return res.status(responseReceived).send({
      statusCode: responseReceived,
      message:
        responseReceived === 200
          ? "Product Deleted"
          : "Product Deletion Failed",
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Something Went Wrong",
      data: error,
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sku } = req.params;
    const { body } = req;
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const response = await updateProductService({ sku, body, files });
    const responseReceived = response ? 200 : 404;
    return res.status(responseReceived).send({
      statusCode: responseReceived,
      message:
        responseReceived === 200
          ? "Product Updated"
          : "Product Updation Failed",
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: "Something Went Wrong",
      data: error,
    });
  }
};
