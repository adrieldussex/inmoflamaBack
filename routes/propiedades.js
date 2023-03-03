var express = require('express');
var router = express.Router();
const {create, read, all, update, destroy} = require('../controllers/PropiedadController')

router.get('/', all);
router.get('/:id', read);
router.post('/', create);
router.patch('/:id', update)
router.delete('/:id', destroy)

module.exports = router;