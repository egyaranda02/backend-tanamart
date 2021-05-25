const { Router } = require('express');
const artikelController = require('../controllers/artikelController');
const router = Router();
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, 'uploads/foto_artikel');
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

router.get('/getArtikel', artikelController.getArtikel);
router.get('/artikelDetails/:id_artikel', artikelController.getArtikelDetails)
router.post('/addArtikel', upload.single('foto_artikel'), artikelController.addArtikel_post);
router.post('/editArtikel', upload.single('foto_artikel'), artikelController.editArtikel_post);
router.delete('/deleteArtikel/:id_artikel', artikelController.deleteArtikel_delete);

module.exports = router;