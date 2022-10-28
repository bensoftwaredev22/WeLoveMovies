const router = require("express").Router({ mergeParams: true })
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

// This route will return a list of all theaters.
// Different query parameters will allow for additional information to be included in the data that is returned.

module.exports = router;
