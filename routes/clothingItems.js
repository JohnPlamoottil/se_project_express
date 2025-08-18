const router = require("express").Router();
const handleAuthorization = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  createItemValidator,
  validateId,
} = require("../middlewares/validation");

router.get("/", getItems);

router.post("/", handleAuthorization, createItemValidator, createItem);

router.put("/:itemId/likes", handleAuthorization, validateId, likeItem);

router.delete("/:itemId/likes", handleAuthorization, validateId, dislikeItem);

router.delete("/:itemId", handleAuthorization, validateId, deleteItem);

module.exports = router;
