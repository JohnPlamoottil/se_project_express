const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const ConflictError = require("../middlewares/errors/conflictError");
const NotFoundError = require("../middlewares/errors/notFound");
const InvalidError = require("../middlewares/errors/invalidError");
const UnauthorizedError = require("../middlewares/errors/unauthorizedError");
const DEFAULT_ERROR = require("../middlewares/errors/serverError");
const { OK, CREATED } = require("../utils/errors");

// Login user
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(InvalidError)
      .json({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OK).send({ token, user });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        const error = err;
        error.statusCode = UnauthorizedError;
        return next(error);
      }

      return next(new Error());
    });
};

// GET current user
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User Not found"));
      }
      if (err.name === "CastError") {
        return res.status(InvalidError).send({ message: "Invalid User ID" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// Create user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(InvalidError)
      .json({ message: "Email and password are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(InvalidError).json({ message: "Invalid email format" });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError("Email already exists"));
      }

      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((user) => {
          res.status(CREATED).send({
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          });
        });
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(InvalidError).json({ message: err.message });
      }

      return res
        .status(DEFAULT_ERROR)
        .json({ message: "An error occurred on the server" });
    });
};

// Update current user
const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User Not Found"));
      }
      if (err.name === "ValidationError") {
        return res.status(InvalidError).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(InvalidError).send({ message: "Invalid User ID" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
