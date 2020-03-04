const router = require('express').Router();
const { Review, Donut, CartItem } = require('../db/models');
module.exports = router;

router.get('/:donutId', async (req, res, next) => {
  try {
    const donut = await Donut.findByPk(req.params.donutId, {
      //I assume we don't want qty for a single donut page.
      //Does this include all that's needed?
      attributes: ['name', 'description', 'price'],
      include: [Review, CartItem],
    });
    res.json(donut);
  } catch (err) {
    next(err);
  }
});
