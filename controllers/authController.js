require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const maxAge = 60 * 60 * 5;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async function (req, res) {
  const { email, password } = req.body;
  try {
    const isUnique = await User.findOne({ where: { email: req.body.email } });
    if (isUnique) {
      return res.status(200).json({
        errors: {
          attribute: "email",
          message: "Email sudah terdaftar!",
        },
      });
    }
    const user = await User.create({ email, password });
    const token = createToken(user.id_user);
    res.status(201).json({ user: user.id_user });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(200).json({
        success: false,
        errors: err.errors.map((e) => {
          return {
            attribute: e.path,
            message: e.message,
          };
        }),
      });
    }
  }
};

module.exports.login_post = async (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      var comparison = bcrypt.compareSync(req.body.password, user.password);
      if (comparison) {
        const token = createToken(user.id_user);
        res.cookie("jwt", token, {maxAge: 60 * 60 * 5 * 1000});
        res.status(201).json({
          user: user.id_user,
          email: user.email,
          jwt: token,
          role: user.role,
        });
        console.log("Login Sukses!");
      } else {
        res.status(200).json({
          errors:{
              attribute: "Authentication",
              message: "Email dan password tidak cocok"
          }
        });
      }
    } else {
      res.status(200).json({
        errors:{
            attribute: "Authentication",
            message: "Email belum terdaftar"
        }
      });
    }
  });
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(201).json("Berhasil logout")
};

module.exports.getUser_get = async function (req, res) {
  try {
    const user = await User.findAll();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.deleteUser_delete = async function (req, res) {
  try {
    await User.destroy({ where: { id_user: req.params.id_user } });
    res.status(201).json("User berhasil dihapus");
  } catch (err) {
    res.status(400).json(err);
  }
};
