var express = require('express');
var router = express.Router();
const propiedadRouter = require('./propiedades')
const usuariosRouter = require('./usuarios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json();
});

router.use('/propiedades', propiedadRouter)
router.use('/admin', usuariosRouter)

module.exports = router;
