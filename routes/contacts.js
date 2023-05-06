const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/contacts', indexController.getAll)
router.get('/contacts/:id', indexController.getById);
router.post('/contacts', indexController.insert)
router.put('/contacts/:id', indexController.updateById)
router.delete('/contacts/:id', indexController.deleteById)

module.exports = router;