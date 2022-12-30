const { hashPassword, comparePassword } = require("../utils/hash-utils");
const {
  getUser,
  createUser,
  updateUserPassword,
} = require("../utils/user-utils");

const registerUserHandler = async (req, res) => {
  const { name, password, mobileNumber } = req.body;

  try {
    let user = await getUser(mobileNumber);

    if (user) {
      return res
        .status(403)
        .json({ status: "Failed", error: "Email is already in use" });
    }
    const hashedPassword = await hashPassword(password);

    await createUser(name, email, hashedPassword);

    return res.status(200).json({ status: "Success", data: { user } });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};

const loginUserHandler = async (req, re) => {
  const { mobileNumber, password } = req.body;

  try {
    const user = await getUser(mobileNumber);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        error: "Mobile Number/Password is incorrect",
      });
    }

    const compareResult = await comparePassword(password, user.password);

    if (!compareResult) {
      return res.status(404).json({
        status: "failed",
        error: "Mobile Number/Password is incorrect",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: { user },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};
const forgotPasswordHandler = async (req, res) => {
  const { mobileNumber, newPassword } = req.body;

  try {
    let user = await getUser(mobileNumber);

    if (user) {
      return res
        .status(403)
        .json({
          status: "Failed",
          error: "No user found with this mobile number",
        });
    }

    const hashedPassword = await hashPassword(newPassword);

    await updateUserPassword(user.id, hashedPassword);

    return res.status(200).json({
      status: "Success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: "Failed to change password",
    });
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  forgotPasswordHandler,
};
