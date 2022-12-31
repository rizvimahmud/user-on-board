const { hashPassword, comparePassword } = require("../utils/hash-utils");
const {
  getUser,
  createUser,
  updateUserPassword,
} = require("../utils/user-utils");

const registerUserHandler = async (req, res) => {
  const { userId, password, mobileNumber } = req.body;
  console.log(req.body);

  try {
    let user = await getUser(userId);

    if (user) {
      return res
        .status(409)
        .json({ status: "Failed", error: "UserId is already in use!" });
    }
    const hashedPassword = await hashPassword(password);

    user = await createUser({ userId, hashedPassword, mobileNumber });
    const userResponse = {
      id: user.id,
      userId: user.userid,
      mobileNumber: user.mobilenumber,
    };

    return res
      .status(200)
      .json({ status: "Success", data: { user: userResponse } });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: "Failed to create user. Try again later",
    });
  }
};

const loginUserHandler = async (req, res) => {
  const { userId, password } = req.body;

  try {
    let user = await getUser(userId);
    if (!user) {
      return res.status(403).json({
        status: "Failed",
        error: "User ID and Password does not match",
      });
    }

    const compareResult = await comparePassword(password, user.password);

    if (!compareResult) {
      return res.status(403).json({
        status: "failed",
        error: "User ID and Password does not match",
      });
    }
    console.log(user);

    const userResponse = {
      id: user.id,
      userId: user.userid,
      mobileNumber: user.mobilenumber,
    };

    return res.status(200).json({
      status: "Success",
      data: { user: userResponse },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: "Failed to successfully login. Try again later",
    });
  }
};

const forgotPasswordHandler = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    let user = await getUser(userId);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        error: "No user found with this ID",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await updateUserPassword(user.id, hashedPassword);

    const userResponse = {
      id: user.id,
      userId: user.userid,
      mobileNumber: user.mobilenumber,
    };

    return res.status(200).json({
      status: "Success",
      data: { user: userResponse },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: "Failed to change password. Try again later",
    });
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  forgotPasswordHandler,
};
