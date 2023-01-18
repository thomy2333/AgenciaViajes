import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'

const app = express();

//conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error))

//definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//obtener el año actual
app.use( (req, res, netx) => {
   const year = new Date();

   res.locals.actualYear = year.getFullYear();
   res.locals.nombreSitio = "Agencia de Viajes"
   netx();
});

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//definir la carpeta publica3
app.use(express.static('public'));

//agregar router
app.use('/', router);


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})