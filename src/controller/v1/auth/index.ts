import { Request, Response, NextFunction } from "express";

import { signInService, logoutService } from "../../../service/v1/auth/index";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const response = await signInService(body);
    const responseRecieved = response ? 200 : 401;
    const responseMessage =
      responseRecieved === 200 ? "Successful SignIn" : "Unauthorised";
    return res.status(responseRecieved).send({
      statusCode: responseRecieved,
      message: responseMessage,
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something Went Wrong",
    });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const response = await logoutService(body);
    const responseRecieved = response ? 200 : 400;
    const responseMessage =
      responseRecieved === 200
        ? "Logged Out Successfully"
        : "Something Went Wrong";
    return res.status(responseRecieved).send({
      statusCode: responseRecieved,
      message: responseMessage,
    });
  } catch (error) {
    console.log("ERROR :", error);
    return res.status(500).send({
      statusCode: 500,
      message: "Something Went Wrong",
    });
  }
};
