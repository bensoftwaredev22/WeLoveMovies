const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExsists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  
  if (review) {
    res.locals.review = review
    return next();
  }
  next({ status: 404, message: 'Review cannot be found' })
}

async function update(req, res, next) {
  const newReview = {
    ...res.locals.review,
    ...req.body.data,
  };

  await service.update(newReview);
  const updatedReview = await service.read(newReview.review_id);
  updatedReview.critic = await service.getCriticById(
    newReview.critic_id
  );
  res.json({ data: updatedReview });
}

async function destroy(req, res, next) {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
  }

module.exports = {
 update: [asyncErrorBoundary(reviewExsists), asyncErrorBoundary(update)],
 delete: [asyncErrorBoundary(reviewExsists), asyncErrorBoundary(destroy)],
}