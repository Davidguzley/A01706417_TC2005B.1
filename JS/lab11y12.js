console.log('hola, mundo!');
console.log('Ya no tuve que detener el servidor');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const rutasUnidades = require('../routes/unidades');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use('/unidades', rutasUnidades);

app.use('/about', (request, response, next) => {
    response.send('<h1>¿Quienes somos?</h1> <p>Somos una organización paramilitar dependiente de la ONU. Dedicada en cuerpo y alma a la reconstrucción y protección del mundo, con la función de estudiar y eliminar a los Ángeles. En relación a la cadena de mando, nuestro comandante Gendō Ikari, junto con el vice-comandante Kōzō Fuyutsuki, son quienes dirigen casi en su totalidad la organización, aunque en realidad los verdaderos jefes de NERV son los miembros de la organización SEELE, con Keel Lorentz a la cabeza.</p>'); 
});

app.use('/location', (request, response, next) => {
    response.send('<h2>Localización</h2> <p>Estamos localizados en el Geo-Frente (especie de caverna esférica subterránea de la cual el 89% está bajo tierra) de Tokio-3.</p>'); 
});

app.get('/', (request, response, next) => {
    response.send('<h1>BIENVENIDO A NERV</h1>'); 
});

app.use( (request, response, next) => {
    response.status(404).send('<h1>Pagina no encontrada en la base de datos de NERV.</h1>');
} );

app.listen(3000);