const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getAll)
router.get('/:id', indexController.getById);
router.post('/', indexController.insert)
router.put('/:id', indexController.updateById)
router.delete('/:id', indexController.deleteById)

module.exports = router;