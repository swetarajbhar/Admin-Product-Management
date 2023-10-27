import { Request, Response, NextFunction, response } from "express";

import { signInService } from "../../../service/v1/auth/index";

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
      message: responseMessage,
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something Went Wrong",
    });
  }
};
