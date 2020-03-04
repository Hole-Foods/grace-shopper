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
      //I assume we don't want qty for a single donut page.
      //Does this include all that's needed?
      attributes: ['name', 'description', 'imageUrl', 'price'],
      include: [Review],
    });
    res.json(donut);
  } catch (err) {
    next(err);
  }
});
