const router = require('express').Router();
const { Review } = require('../db/models');
const { isLoggedIn } = require('../utils');
module.exports = router;

// get all reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// get all reviews for specific donut
router.get('/donuts/:donutId', async (req, res, next) => {
  try {
    const review = await Review.findAll({
      where: { donutId: req.params.donutId },
    });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// get all reviews for specific user
router.get('/users/:userId', async (req, res, next) => {
  try {
    const review = await Review.findAll({
      where: { userId: req.params.userId },
    });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// add review
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (err) {
    next(err);
  }
});
