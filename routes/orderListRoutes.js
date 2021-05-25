const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const orderListController = require('../controllers/orderListController');
const orderListMiddleware = require("../middleware/orderListMiddleware");
const router = Router();

router.get('/showOrderUser/:id_user', orderListController.showOrderUser_get);
router.get('/showOrderAdmin/', authMiddleware.checkAdmin, orderListController.showOrderAdmin_get);
router.get('/tokoInvoice/:id_toko', orderListController.showOrderToko_get);
router.post('/checkout', orderListMiddleware.requireBiodata, orderListController.checkOut);
router.post('/sendProduct', orderListController.sendProduct);
router.post('/productArrived', orderListController.productArrived);


module.exports = router;