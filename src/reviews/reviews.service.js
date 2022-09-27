const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews").select("*").where({review_id: reviewId }).first();
}

function update(updatedReview) {
    const updatedReviewResponse =  knex("reviews")
        .select('*')
        .where({ review_id: reviewId })
        .update(updatedReview, '*');

        return updatedReviewResponse[0]
}

module.exports = {
    read,
    update,

};

