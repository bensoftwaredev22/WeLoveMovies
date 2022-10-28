const router = require("express").Router({ mergeParams: true })
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/:reviewId").put(controller.update).delete(controller.delete).all(methodNotAllowed);
router.route("/").all(methodNotAllowed);
//This route will allow you to partially or fully update a review. If the ID is incorrect, a 404 will be returned.
//This route will delete a review by ID. If the ID is incorrect, a 404 will be returned.

module.exports = router;
