const knex = require("../db/connection");

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

function read(movieId) {
  return knex('movies')
    .select('*')
    .where({ movie_id: movieId })
    .first();
}


module.exports = {
  list,
  read,
};