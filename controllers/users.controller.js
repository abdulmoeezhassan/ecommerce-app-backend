const usersSchema = require("../schemas/users.schema");

const userController = {};

userController.getAllUsers = async (req, res) => {
  try {
    const users = await usersSchema.find();
    return res.status(200).send({
      status: 200,
      message: "Users Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};


module.exports = userController;
