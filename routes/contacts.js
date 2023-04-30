const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.post('/insert', indexController.insert)
router.get('/contacts', indexController.getAll)
router.get('/contacts/:id', indexController.getById);

module.exports = router;