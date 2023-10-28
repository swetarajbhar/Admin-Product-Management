import { Request, Response, NextFunction } from "express";
import { AdminUserModel } from "../../mongodb/models/user";

import jwt from "jsonwebtoken";

async function generateToken(params: { email: string }): Promise<string> {
  try {
    const tokenParams = {
      email: params.email,
    };

    const xAccessToken = jwt.sign(
      tokenParams,
      `${process.env.TOKEN_JWTSECRET}`,
      {
        expiresIn: `${process.env.TOKEN_JWTEXPIRY}`,
      }
    );

    if (params.email) {
      const updateParams = {
        email: params.email,
        xAccessToken: xAccessToken,
      };

      await AdminUserModel.findOneAndUpdate(
        { email: params.email },
        updateParams
      );
    }
    return xAccessToken;
  } catch (error) {
    console.error("JWT -> API -> UTIL -> jwt -> generateToken()", error);
    throw error;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ");
      if (token && token[0] === "Bearer" && token[1]) {
        jwt.verify(
          token[1],
          `${process.env.TOKEN_JWTSECRET}`,
          async (error: any, verifiedData: any) => {
            if (verifiedData) {
              let userDetails = await AdminUserModel.findOne({
                email: verifiedData.email,
                xAccessToken: token[1],
              });

              if (userDetails) {
                userDetails = JSON.parse(JSON.stringify(userDetails));
                req.body.userId = userDetails?._id;
                req.body.userName = userDetails?.fullName;
                next();
              } else {
                res.status(401).send({
                  status: 401,
                  message: "Unauthorized Access",
                });
              }
            } else {
              res.status(401).send({
                status: 401,
                message: "Unauthorized Access",
              });
            }
          }
        );
      }
    } else {
      res.status(401).send({
        status: 401,
        message: "Unauthorized Access",
      });
    }
    // const token = req.headers["x-access-token"] as string | undefined;
    // if (token) {
    //   jwt.verify(
    //     token,
    //     `${process.env.TOKEN_JWTSECRET}`,
    //     async (error: any, verified_data: any) => {
    //       if (verified_data) {
    //         let userDetails = await AdminUserModel.findOne({
    //           email: verified_data.email,
    //         });

    //         if (userDetails) {
    //           userDetails = JSON.parse(JSON.stringify(userDetails));
    //           req.body.userId = userDetails?._id;
    //           req.body.userName = userDetails?.fullName;
    //           next();
    //         } else {
    //           res.status(401).send({
    //             status: 401,
    //             message: "Unauthorized Access",
    //           });
    //         }
    //       } else {
    //         res.status(401).send({
    //           status: 401,
    //           message: "Unauthorized Access",
    //         });
    //       }
    //     }
    //   );
    // } else {
    //   res.status(401).send({
    //     status: 401,
    //     message: "Unauthorized Access",
    //   });
    // }
  } catch (error) {
    throw error;
  }
};

export { generateToken, verifyToken };
