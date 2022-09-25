const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");

async function list(req, res, next) {
  const data = await service.list(req.query.is_showing);
  res.json({ data });
}

async function movieExsists(req, res, next) {
  const movie = await service.read(req.params.movieId)
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return ({ status: 404, message: 'Moive cannot be found' })
}

async function read(req, res, next) {
  const {movie: data} = res.locals;
  res.json({ data });
}

async function theaterList(req, res, next) {
  const { movieId } = req.params;
  res.json({ data: await service.theaterList(movieId)})
}

async function reviewList(req, res, next) {
  const { movieId } = req.params;
  res.json({ data: await service.reviewList(movieId) });
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExsists), read],
  theaterList: asyncErrorBoundary(theaterList),
  reviewList: asyncErrorBoundary(reviewList),
}