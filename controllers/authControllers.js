const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.test = async (req, res) => {
  try {
    res.send("Test authControllers OK !");
  } catch (error) {
    res.send({ msg: "Test authControllers failed!", error });
  }
};

exports.register = async (req, res) => {
  try {
    const { fisrtName, lastName, email, password, phone } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).send({ errors: [{ msg: "Email already used" }] });
    }

    let newUser = await new User({ ...req.body });

    // Hash password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt)
    newUser.password = hashedPassword;

    await newUser.save();

            const token = jwt.sign(
              {
                id: newUser._id,
              },
              process.env.SECRET_KEY
            );

    res.status(201).send({
      success: [{ msg: "Register Successfully !" }],
      newUser,
      token
    });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "Can not register" }] });
  }
};



exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const foundUser = await User.findOne({email})

        if (!foundUser) {
            return res.status(404).send({errors: [{msg: "User not found with this email"}]})
        }

        const hashedPassword = await bcrypt.compare(password, foundUser.password)

        if (!hashedPassword) {
            return res.status(400).send({errors: [{msg: "Password incorrect"}]})
        }


                        const token = jwt.sign(
                          {
                            id: foundUser._id,
                          },
                          process.env.SECRET_KEY,
                          { expiresIn: "7d" }
                        );

                res
                  .status(200)
                  .send({
                    success: [
                      { msg: `Hello ${foundUser.firstName} Welcome Back !` },
                    ],
                    foundUser,
                    token
                  });

    } catch (error) {
                console.error(error.message);
                res.status(500).send({ errors: [{ msg: "Can not login" }] });
    }
}
