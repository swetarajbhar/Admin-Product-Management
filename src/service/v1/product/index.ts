export const addProductService = async (req: {
  body: Record<any, any>;
  files: Express.Multer.File[];
}): Promise<void | null> => {
  console.log("SERVICE REQUEST :", req);
  // // Find the user by their email and check if they are active
  // const findUser = await AdminUserModel.findOne({
  //   email: req.email,
  //   isActive: true,
  // });
  // // Validate the user's password
  // const validatePassword =
  //   findUser !== null && (await matchPassword(req, findUser));
  // // Generate a token if the password is valid
  // const token = validatePassword ? await generateToken(req) : null;
  // // Return user information and token if the password is valid
  // return findUser && validatePassword && token
  //   ? {
  //       name: findUser.fullName,
  //       xAccessToken: token,
  //     }
  //   : null;
};
