const { Router } = require('express');
const tokoController = require('../controllers/tokoController');
const router = Router();
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, 'uploads/foto_toko');
    },
    filename: function(req, file, next){
        next(null, uuid.v4() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, next)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        next(null, true);
    }else{
        next(new Error('Please only upload jpeg, jpg, and png'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


router.get('/toko', tokoController.getToko);
router.get('/tokoDetails/:id_toko', tokoController.getTokoDetails);
router.get('/tokoByUser/:id_user', tokoController.getTokoByUser);
router.post('/addToko', upload.single('foto_toko'), tokoController.addToko_post);

module.exports = router;