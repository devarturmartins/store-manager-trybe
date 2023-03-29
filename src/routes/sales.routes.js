const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.get('/', salesController.findSales);
router.get('/:id', salesController.salesById);
router.post('/', salesController.createSales);

module.exports = router;