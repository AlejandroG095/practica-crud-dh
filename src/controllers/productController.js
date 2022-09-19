//metodo pra manejar los datos del products.json
const fs = require('fs');
const path = require('path');

//funcion para enlistar todos los productos
function findAll(){
    //obtenemos la informacion del json
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    //transformamos la informacion de un string para poder trabajar con ella en javascript
    const data = JSON.parse(jsonData);
    //devolvemos la informacion
    return data;
}
//funcion para añadir los datos a nuestro productController
function writeFile(data){
    // ,null y ,4 sirven para formatear el json
    const dataString = JSON.stringify(data, null, 4);
    //sobreescribimos todo el archivo con la nueva informacion:
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), dataString);
}

const controller = {
    list: (req, res) => {
        const data = findAll();
        res.render('menu-products', {products: data});
    },
    detail: (req, res) => {
        const data = findAll();
        const platoEncontrado = data.find( function(plato){
            return plato.id == req.params.id;
        })

        res.render('product-detail', {plato: platoEncontrado})
    },
    create: (req, res) => {
        res.render('product-create-form')
    },
    store: (req, res) => {
    //obetenemos la info de la base de datos:
        const data = findAll();
        // obtenemos los datos del registro del formulario product-create-form.ejs
        const newProduct = {
            //sumamos 1 al tamaño del archivo para que el id siga creciendo de uno en uno
            id: data.length + 1,
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description
        }
        // agregamos el nuevo producto a nuesto arreglo de productos:
        data.push(newProduct);
        // llamamos a la funcion create para sobreescribir la lista de productos que tenemos en la carpeta data
        writeFile(data);
        // redirigir a un enlace de confirmacion, o algo...
        res.redirect('/products/list');
    },
    edit: (req, res) => {
        //buscamos todos los productos que tenemos
        const data = findAll();
        //encontramos el plato con el id que vamos a editar y lo retornamos
        const platoEncontrado = data.find( function(plato){
            return plato.id == req.params.id;
        });
        //renderizamos la vista con el dato del plato a editar
        res.render('product-update-form', {plato: platoEncontrado});
    },
    update: (req, res) => {
        //buscamos todos los productos que tenemos
        const data = findAll();
        //encontramos el plato con el id que vamos a editar y lo retornamos
        const platoEncontrado = data.find( function(plato){
            return plato.id == req.params.id;
        });
        //agregamos los nuevos valores al item editado platoEncontrado que es una referencia a la constante data
        platoEncontrado.name = req.body.name;
        platoEncontrado.price = req.body.price;
        platoEncontrado.description = req.body.description;
        //sobreescribimos el registro en nuestro archivo js pasando data
        writeFile(data);
        //redirigimos
        res.redirect('/products/list');
    }
}

module.exports = controller;