// Módulos
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mainRouter = require("./routes/mainRouter");
const productRouter = require('./routes/productRouter');

// Configuración
// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Define la ubicación de la carpeta de las Vistas
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "../public")));//Definimos la ruta que contiene los recursos estaticos
app.use(express.urlencoded({ extended: false }));//Para recibir la informacion que llega de los formularios
app.use(express.json());

// Routers
app.use("/", mainRouter);
app.use('/products', productRouter);

app.listen(3000, () => {
  console.log("Servidor arriba en el puerto 3000");
});
