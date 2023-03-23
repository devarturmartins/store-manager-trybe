const { Router } = require('express');
const { productsController } = require('../controllers');

const router = Router();

router.get('/', productsController.findProducts);

router.get('/:id', productsController.findById);

router.post('/', productsController.createProduct);

module.exports = router;