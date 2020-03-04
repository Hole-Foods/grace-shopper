const router = require('express').Router();
const { Donut } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const donuts = await Donut.findAll();
    console.log('DOOOOOOOONUTS', donuts);
    res.json(donuts);
  } catch (err) {
    next(err);
  }
});
