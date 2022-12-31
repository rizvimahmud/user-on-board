const { db } = require("../db.js");

const getUser = async (userId) => {
  const { rows } = await db.query("SELECT * FROM users WHERE userId = $1", [
    userId,
  ]);
  if (rows) {
    return rows[0];
  }
  return null;
};

const createUser = async ({
  userId,
  hashedPassword: password,
  mobileNumber,
}) => {
  const { rows } = await db.query(
    "INSERT INTO users (userId, password, mobileNumber) values ($1, $2, $3) returning *",
    [userId, password, mobileNumber]
  );
  if (rows) {
    return rows[0];
  }

  return null;
};

const updateUserPassword = async (id, newPassword) => {
  const { rows } = await db.query(
    "UPDATE users SET password = $1 WHERE id = $2 returning *",
    [newPassword, id]
  );

  if (rows) {
    return rows[0];
  }

  return null;
};

module.exports = {
  getUser,
  createUser,
  updateUserPassword,
};
