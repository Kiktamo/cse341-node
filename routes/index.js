const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

module.exports = router;
