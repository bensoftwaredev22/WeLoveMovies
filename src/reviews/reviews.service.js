const knex = require("../db/connection");

function read(reviewId) {
  let review_id = reviewId
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

function getCriticById(criticId) {
  return knex('critics').select('*').where({ critic_id: criticId }).first();
}

function update(updatedReview) {
  return knex('reviews')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, ['*'])
    .then((data) => data[0]);
}

function destroy(review_id) {
  return knex('reviews').where({ review_id }).del();
}

module.exports = {
  read,
  getCriticById,
  update,
  delete: destroy,
};

