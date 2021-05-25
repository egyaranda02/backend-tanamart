const { Router } = require('express');
const threadsController = require('../controllers/threadsController');
const router = Router();
const path = require('path');
const uuid = require('uuid');
const multer = require('multer');

// setup directory dan filename pada multer
const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, 'uploads/foto_threads');
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

router.get('/getThreads', threadsController.getThreads);
router.get('/threadsDetails/:id_threads', threadsController.getThreadsDetails);
router.get('/threadsByUser/:id_user', threadsController.getThreadsByUser);
router.post('/addThreads', upload.single('foto_threads'), threadsController.addThreads_post);
router.post('/editThreads', upload.single('foto_threads'), threadsController.editThreads_post);
router.delete('/deleteThreads/:id_threads', threadsController.deleteThreads_delete);

module.exports = router;