const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userRegisterController(req, res) {
  try {
    const { email, password, name } = req.body;

    // console.log("req.body", req.body);
    const user = await userModel.findOne({ email });

    console.log("user", user);

    if (user) {
      throw new Error("!User Already Exists...");
    }

    if (!name) {
      throw new Error("Please Provide User ID");
    }
    if (!email) {
      throw new Error("Please Provide Email ID");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong!!!");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Account Created Successfully",
    });
  } catch (err) {
    console.log("err");
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userRegisterController;
