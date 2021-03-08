const express = require('express');
const router = express.Router();
const path = require('path');
const unidadesController = require('../controllers/unidades_controller');
const isAuth = require('../util/is-auth');

//Para acceder a los recursos de la carpeta public
router.use(express.static(path.join(__dirname,'..', 'public')));

router.get('/nueva-unidad', isAuth, unidadesController.getNuevaUnidad);

router.post('/nueva-unidad', isAuth, unidadesController.postNuevaUnidad);

router.get('/:unidad_num', isAuth, unidadesController.getUnidad);

router.get('/', unidadesController.get);

module.exports = router;