const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.post('/insert', indexController.insert)
router.get('/getAll', indexController.getAll)
router.get('/getId/:id', indexController.getById);

module.exports = router;