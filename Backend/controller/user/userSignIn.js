const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please Provide Email ID");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User Not Found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h",
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Logged-In Succesfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please Check Your Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
