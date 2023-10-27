import { AdminUserModel } from "../../../mongodb/models/user";
import { generateToken } from "../../../utils/jwt/index";

import bcrypt from "bcrypt";

// Function to compare a given password with the user's stored password
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

// Service function for user sign-in
export const signInService = async (req: {
  email: string;
  password: string;
}): Promise<{ name: string; xAccessToken: string } | null> => {
  // Find the user by their email and check if they are active
  const findUser = await AdminUserModel.findOne({
    email: req.email,
    isActive: true,
  });

  // Validate the user's password
  const validatePassword =
    findUser !== null && (await matchPassword(req, findUser));

  // Generate a token if the password is valid
  const token = validatePassword ? await generateToken(req) : null;

  // Return user information and token if the password is valid
  return findUser && validatePassword && token
    ? {
        name: findUser.fullName,
        xAccessToken: token,
      }
    : null;
};
