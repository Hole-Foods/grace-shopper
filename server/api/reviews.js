const router = require('express').Router();
const { User, Donut, Review } = require('../db/models');
const { isLoggedIn } = require('../utils');
module.exports = router;

// all reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// all reviews for specific donut
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

// all reviews for specific user
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

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const review = await Review.create(req.body);
      res.json(review);
    } else if (!req.user) {
      console.log('Log in to add a review');
    }
  } catch (err) {
    next(err);
  }
});
