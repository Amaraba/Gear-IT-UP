const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGDB_URI);
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectDB;
