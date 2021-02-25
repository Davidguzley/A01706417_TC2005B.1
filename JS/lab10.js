const http = require('http');
const filesystem = require('fs');

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

const server = http.createServer( (request, response) => {
    console.log("hola desde el servidor");
    console.log(request.url);
    
    if (request.url === "/unidades") {
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write('<head><meta charset="UTF-8"><title>NERV</title></head>');
        response.write("<body><h1>Unidades Evangelion</h1></body>");
        
        if (EVAS.length == 0) {
            response.write("<h2>Actualmente no existen unidades Evangelion</h2>");
        }
        else {
            response.write("<ul>");
            for (let EVA of EVAS) {
                response.write("<li>");
                response.write(EVA.toString());
                response.write("</li>");
            }
            response.write("</ul>");  
        }
        response.write("</html>");
        response.end();
    }

    else if (request.url === "/nueva-unidad" && request.method === "GET") {
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write('<head><meta charset="UTF-8"><title>NERV</title></head>');
        response.write("<body><h1>Asigna una nueva unidad Evangelion</h1>");
        response.write('<form action="nueva-unidad" method="POST"> <input type="text" name="nombre" placeholder="Numero de EVA"> <br>');
        response.write('<input type="text" name="children" placeholder="Nombre del niño elegido"> <br>');
        response.write('<input type="text" name="pais" placeholder="Pais de origen del niño"> <br> <input type="submit" value="Guardar EVA"></form>');
        response.write("</body>");
        response.write("</html>");
        response.end();
    }
    
    else if (request.url === "/nueva-unidad" && request.method === "POST") {
        const datos = [];
        request.on('data', (dato) => {
            console.log(dato);
            datos.push(dato);
        });
        return request.on('end', () => {
            const datos_completos = Buffer.concat(datos).toString();
            console.log(datos_completos);
            const entrada = datos_completos.replace(/[+]/gi, ' ');
            console.log(entrada);
            const eq1 = entrada.indexOf("=") + 1;
            const eq2 = entrada.indexOf("=", eq1) + 1;
            const eq3 = entrada.indexOf('=', eq2) + 1;
            const and1 = entrada.indexOf("&") + 1;
            const and2 = entrada.indexOf("&", and1) + 1;
            const nombre = entrada.substr(eq1, (and1-eq1)-1);
            const niño = entrada.substr(eq2, (and2-eq2)-1);
            const pais = entrada.substr(eq3);
            var nueva_unidad = new EVA(nombre, niño, pais)
            filesystem.writeFileSync('lab10.txt', nueva_unidad.toString());
            EVAS.push(nueva_unidad);
            response.statusCode = 302;
            response.setHeader('Location', '/unidades');
            return response.end();
        });

    }

    else if (request.url === "/") {
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write('<head><meta charset="UTF-8"><title>NERV</title></head>');
        response.write("<body><h1>BIENVENIDO A NERV</h1>");
        response.write('<h2>¿Quienes somos?</h2>');
        response.write('<p>Somos una organización paramilitar dependiente de la ONU. Dedicada en cuerpo y alma a la reconstrucción y protección del mundo, con la función de estudiar y eliminar a los Ángeles. En relación a la cadena de mando, nuestro comandante Gendō Ikari, junto con el vice-comandante Kōzō Fuyutsuki, son quienes dirigen casi en su totalidad la organización, aunque en realidad los verdaderos jefes de NERV son los miembros de la organización SEELE, con Keel Lorentz a la cabeza.</p>');
        response.write('<h2>Localización</h2>');
        response.write('<p>Estamos localizados en el Geo-Frente (especie de caverna esférica subterránea de la cual el 89% está bajo tierra) de Tokio-3</p></body>');
        response.write("</html>");
        response.end();
    }

    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write('<head><meta charset="UTF-8"><title>Page not found</title></head>');
        response.write("<body><h1>Pagina no encontrada en la base de datos de NERV.</h1></body>");
        response.write("</html>");
        return response.end();
    }

    
});

server.listen(3000);