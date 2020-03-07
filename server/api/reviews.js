const router = require('express').Router();
const { User, Donut, Review } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id },
    });
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

router.post('/', async (req, res, next) => {
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

// router.post('/', (req, res, next) => {
//   Review.create(req.body)
//     .then(review => res.json(review))
//     .catch(next);
// });
