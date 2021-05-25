const { Router } = require('express');
const biodataController = require('../controllers/biodataController');
const router = Router();
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, 'uploads/profile_pict');
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


router.get('/biodata', biodataController.getBiodata);
router.get('/biodataDetails/:id_bio', biodataController.getBiodataDetails);
router.get('/biodataByUser/:id_user', biodataController.getBiodataByUser);
router.post('/addBiodata', upload.single('profile_pict'), biodataController.addBiodata_post);

module.exports = router;