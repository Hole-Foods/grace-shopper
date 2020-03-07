const router = require('express').Router();
const { Donut, Review } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const donuts = await Donut.findAll();
    res.json(donuts);
  } catch (err) {
    next(err);
  }
});

router.get('/:donutId', async (req, res, next) => {
  try {
    const donut = await Donut.findByPk(req.params.donutId, {
      include: [Review],
    });
    res.json(donut);
  } catch (err) {
    next(err);
  }
});
