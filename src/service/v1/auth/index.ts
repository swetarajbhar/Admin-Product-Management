import { AdminUserModel } from "../../../mongodb/models/user";
import { generateToken } from "../../../utils/jwt/index";

import bcrypt from "bcrypt";

async function matchPassword(
  params: { password: string },
  findUser: { password: string }
): Promise<boolean> {
  const matchPasswordResult: boolean = await bcrypt.compare(
    params.password,
    findUser.password
  );
  return matchPasswordResult;
}

export const signInService = async (req: {
  email: string;
  password: string;
}): Promise<{ name: string; xAccessToken: string } | null> => {
  try {
    const findUser = await AdminUserModel.findOne({
      email: req.email,
      isActive: true,
    });

    const validatePassword =
      findUser !== null && (await matchPassword(req, findUser));

    const token = validatePassword ? await generateToken(req) : null;

    return findUser && validatePassword && token
      ? {
          name: findUser.fullName,
          xAccessToken: token,
        }
      : null;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async (req: {
  userId: string;
  userName: string;
}) => {
  try {
    const response = await AdminUserModel.findByIdAndUpdate(
      {
        _id: req.userId,
      },
      {
        xAccessToken: null,
      }
    );

    return response || null;
  } catch (error) {
    throw error;
  }
};
