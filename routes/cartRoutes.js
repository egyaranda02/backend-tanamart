const { Router } = require('express');
const cartController = require('../controllers/cartController');
const orderListMiddleware = require('../middleware/orderListMiddleware');
const router = Router();

router.post('/addCart', orderListMiddleware.requireBiodata, cartController.addCart_post);
router.get('/showCart/:id_user', cartController.showUserCart_get);
router.post('/editCart', cartController.editCart_post);
router.delete('/deleteCart/:id_cart', cartController.deleteCart);


module.exports = router;