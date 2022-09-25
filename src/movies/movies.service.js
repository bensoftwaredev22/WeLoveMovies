const knex = require("../db/connection");
const addCritic = require("../utils/addCirtic");

function list(isShowing) {
  if (isShowing === 'true') {
    return listShowings()
  }
  return knex('movies').select('*');
}

function listShowings() {
  return knex('movies')
    .join('movies_theaters as mt', 'movies.movie_id', 'mt.movie_id')
    .select(
      'movies.movie_id',
      'movies.title',
      'movies.runtime_in_minutes',
      'movies.rating',
      'movies.description',
      'movies.image_url'
    )
    .groupBy('movies.movie_id')
    .where({is_showing: true})
}

function theaterList(movieId) {
  return knex('theaters as t')
    .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
    .select('t.*')
    .where({ 'mt.movie_id': movieId })
}

function read(movieId) {
  return knex('movies')
    .select('*')
    .where({ movie_Id: movieId })
    .first();
}


module.exports = {
  list,
  read,
  theaterList,
};