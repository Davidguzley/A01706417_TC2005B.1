const http = require('http');

const server = http.createServer( (request, response) => {
    console.log("hola desde el servidor");
    console.log(request.url);

    class EVA{
        constructor(nombre, children, pais){
            this.nombre = nombre;
            this.children = children;
            this.pais = pais;
        }
    
        toString(){
            return (`Unidad ${this.nombre} pilotada por ${this.children} de ${this.pais}.`);
        }
    }

    const unidad1 = new EVA("EVA 00", "Rei Ayanami", "Japón");
    const unidad2 = new EVA("EVA 01", "Shinji Ikari", "Japón");
    const unidad3 = new EVA("EVA 02", "Asuka Langley", "Alemania");
    const EVAS = [unidad1, unidad2, unidad3];
    
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
        response.write('<form action="nueva-unidad" method="POST"> <input type="text" name="nombre"> <br>');
        response.write('<input type="text" name="children"> <br>');
        response.write('<input type="text" name="pais"> <br> <input type="submit" value="Guardar EVA"></form>');
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
            const eq1 = datos_completos.indexOf("=") + 1;
            console.log(eq1);
            const eq2 = datos_completos.indexOf("=", eq1) +1;
            console.log(eq2);
            const eq3 = datos_completos.indexOf('=', eq2) + 1;
            console.log(eq3);
            const and1 = datos_completos.indexOf("&") + 1;
            console.log(and1);
            const and2 = datos_completos.indexOf("&", and1) + 1;
            console.log(and2);
            const nombre = datos_completos.substr(eq1, and1);
            const niño = datos_completos.substr(eq2, and2);
            const pais = datos_completos.substr(eq3);
            const nueva_unidad = new EVA(nombre,niño,pais)
            EVAS.push(nueva_unidad);
            console.log(nueva_unidad.toString());
            console.log(EVAS);
            return response.end();
        });

    }

    else if (request.url === "/") {
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write('<head><meta charset="UTF-8"><title>NERV</title></head>');
        response.write("<body><h1>Hola desde el servidor</h1></body>");
        response.write("</html>");
        response.end();
    }

    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write("<html>");
        response.write('<head><meta charset="UTF-8"><title>Page not found</title></head>');
        response.write("<body><h1>Page no encontrada en la base de datos de NERV.</h1></body>");
        response.write("</html>");
        return response.end();
    }

    
});

server.listen(3000);