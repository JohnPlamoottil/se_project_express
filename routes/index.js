const router = require("express").Router();

const { login, createUser } = require("../controllers/users");
const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");
const { NotFoundError } = require("../middlewares/errors/notFound");
const {
  userAuthenticationValidator,
  userBodyValidator,
} = require("../middlewares/validation");

router.use("/items", clothingItemRouter);
router.use("/users", userRouter);
router.post("/signin", userAuthenticationValidator, login);
router.post("/signup", userBodyValidator, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
