const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// get user for all
router.get("/", getUsers);
// get user for one via ID
router.get("/:userId", getUser);
// create a user
router.post("/", createUser);

module.exports = router;
