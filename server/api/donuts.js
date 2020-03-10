const router = require('express').Router();
const { Donut, Review } = require('../db/models');
module.exports = router;
const { isAdmin } = require('../utils');

router.get('/', async (req, res, next) => {
  try {
    const donuts = await Donut.findAll();
    res.json(donuts);
  } catch (err) {
    next(err);
  }
});

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const donut = await Donut.create(req.body);
    res.json(donut);
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

router.delete('/:donutId', isAdmin, async (req, res, next) => {
  try {
    await Donut.destroy({ where: { id: req.params.donutId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put('/:donutId', isAdmin, async (req, res, next) => {
  try {
    const donut = await Donut.findByPk(req.params.donutId);
    await donut.update(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
