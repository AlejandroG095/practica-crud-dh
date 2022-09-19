const express = require("express");
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/list', productController.list);
router.get('/detail/:id', productController.detail);
//ruta para ver el formulario de creación del producto:
router.get('/create', productController.create);
//ruta para guardar la informacion del producto creado
router.post('/create', productController.store);
//ruta para ver el formulario de edición del producto:
router.get('/edit/:id', productController.edit);
//ruta para generar el proceso de edicion
router.put('/edit/:id', productController.update);



module.exports = router;