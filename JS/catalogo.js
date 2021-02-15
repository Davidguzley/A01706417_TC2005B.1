function añadir(){
        var telefonos = document.getElementById("n_telefono");
        var guantes = document.getElementById("n_guante");
        var jordans = document.getElementById("n_jordan");

        var c_telefonos = telefonos.value * 15999;
        var c_guantes = guantes.value * 2500;
        var c_jordans = jordans.value * 4850;
        var total = c_telefonos + c_guantes + c_jordans;

        let resultado = document.getElementById("fin");
        resultado.innerHTML = `<br><br><h3> Total: ${total} IVA: ${total*0.16} </h3> <button id= "pago" onclick="ordenar()">Confirmar compra</button>`;
}

function ordenar(){
    alert("¡¡Muchas gracias por tu compra!! :)");
}