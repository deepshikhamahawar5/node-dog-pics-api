const express = require('express');
const multer = require('multer');
const dogController = require('../controllers/dogController');
const auth = require('../middleware/auth');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });
//const upload = multer({ storage: multer.memoryStorage() });
router.post('/dogs', auth, upload.single('dogPic'), dogController.uploadDogPic);
router.delete('/dogs/:id', auth, dogController.deleteDogPic);
router.put('/dogs/:id', auth, upload.single('dogPic'), dogController.updateDogPic);
router.get('/dogs/:id', auth, dogController.getDogPic);
router.get('/dogs', auth, dogController.getDogPics);

module.exports = router;
