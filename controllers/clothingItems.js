const clothingItem = require("../models/clothingItem");
const ForbiddenError = require("../middlewares/errors/forbiddenError");
const NotFoundError = require("../middlewares/errors/notFound");
const InvalidError = require("../middlewares/errors/invalidError");
const DEFAULT_ERROR = require("../middlewares/errors/serverError");
const { OK, CREATED } = require("../middlewares/errors/errors");

// GET clothing items
const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => {
      res.status(OK).send({ data: items });
    })
    .catch(next);
};

// POST  clothing items
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(InvalidError).send({ message: "Invalid item data" });
      }
      return next(new Error());
    });
};

// PUT liking clothing items
const likeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NotFoundError).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(InvalidError).send({ message: "Invalid item ID" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// Dislike clothing items
const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NotFoundError).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(InvalidError).send({ message: "Invalid item ID" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// Delete clothing items
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }

      if (item.owner.toString() !== userId.toString()) {
        return next(
          new ForbiddenError("You are not authorized to delete this item")
        );
      }

      return item.deleteOne().then(() => {
        res.status(OK).send({ message: "Item deleted successfully" });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(InvalidError).send({ message: "Invalid item ID" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};
module.exports = {
  getItems,
  createItem,
  likeItem,
  deleteItem,
  dislikeItem,
};
