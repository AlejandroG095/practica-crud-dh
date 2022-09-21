const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
//requerimos multer
const multer = require('multer');


//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/imagenes-platos'))
    },
    filename: (req, file, cb) => {
        const newFileName = file.fieldname + Date.now() + '-' + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({storage:storage});


//Definimos las rutas
router.get('/list', productController.list);
router.get('/detail/:id', productController.detail);
//ruta para ver el formulario de creación del producto:
router.get('/create', productController.create);
//ruta para guardar la informacion del producto creado
//agregamos el metodo upload.single(image) par cargar la imagen con multer del formulario (image) es el name del atributo en el formulario:
/*<div class="field-wrap">
    <label for="image">Cargar imagen</label>
    <input type="file" name="image"<------- id="image">
</div> */
router.post('/create', upload.single("image") ,productController.store);
//ruta para ver el formulario de edición del producto:
router.get('/edit/:id', productController.edit);
//ruta para generar el proceso de edicion
router.put('/edit/:id', productController.update);
//ruta para borrar
router.delete('/delete/:id', productController.delete);



module.exports = router;