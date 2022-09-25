const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next) {
  const data = await service.list(req.query.is_showing);
  res.json({ data });
}


module.exports = {
  list: asyncErrorBoundary(list),
}