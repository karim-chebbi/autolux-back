const user = require("../models/user");


exports.test = async (req, res) => {
    res.send("Test userControllers OK")
}



exports.getUsers = async (req, res) => {
  try {
    const foundUsers = await user.find().sort({ createdAt: -1 });
    res.status(200).send({ msg: "Users Found :", foundUsers });
  } catch (error) {
    res.status(500).send({ msg: "Error finding users", error });
  }
};