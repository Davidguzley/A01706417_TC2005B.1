console.log('hola, mundo!');
console.log('Ya no tuve que detener el servidor');
console.log('Genial!');

const express = require('express');
const bodyParser = require('body-parser');
const filesystem = require('fs');
const app = express();

class EVA{
    constructor(nombre, children, pais){
        this.nombre = nombre;
        this.children = children;
        this.pais = pais;
    }

    toString(){
        return (`Unidad EVA ${this.nombre} pilotada por ${this.children} de ${this.pais}.`);
    }
}

const unidad1 = new EVA("00", "Rei Ayanami", "Japón");
const unidad2 = new EVA("01", "Shinji Ikari", "Japón");
const unidad3 = new EVA("02", "Asuka Langley", "Alemania");
const EVAS = [unidad1, unidad2, unidad3];

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

app.get('/unidades/nueva-unidad', (request, response, next) => {
    response.send('<h1>Asigna una nueva unidad Evangelion</h1><form action="nueva-unidad" method="POST"> <input type="text" name="nombre" placeholder="Numero de EVA"> <br><input type="text" name="children" placeholder="Nombre del niño elegido"> <br><input type="text" name="pais" placeholder="Pais de origen del niño"> <br> <input type="submit" value="Guardar EVA"></form>'); 
});

app.post('/unidades/nueva-unidad', (request, response, next) => {
    console.log(request.body.nombre);
    console.log(request.body.children);
    console.log(request.body.pais);
    var nueva_unidad = new EVA(request.body.nombre, request.body.children, request.body.pais);
    filesystem.writeFileSync('lab11.txt', nueva_unidad.toString());
    EVAS.push(nueva_unidad);
    response.redirect('/unidades');
});

app.use('/unidades', (request, response, next) => {
    let html = '<h1>UNIDADES</h1><ul>';
    for (let EVA of EVAS) {
        html = html + '<li>' + EVA.toString() + '</li>';
    }
    html = html + '</ul>'
    response.send(html); 
});

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