const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function reviewExsists(req, res, next) {
    const { reviewId } = req.params;

    const review = await service.read(reviewId)

    if (review) {
        res.locals.review = review;
        //console.log(review)
        return next();
    }
    next({ status: 404, message: "Review cannot be found."})
}

async function update(req, res, next) {
    res.json({ data: await service.update(req.body) })
}

module.exports = {
 update: [asyncErrorBoundary(reviewExsists), asyncErrorBoundary(update)],
}