const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:movieId/reviews").get(controller.reviewList).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.theaterList).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

//These routes will return a single movie by ID.

router.route("/").get(controller.list).all(methodNotAllowed);

//This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.

module.exports = router;