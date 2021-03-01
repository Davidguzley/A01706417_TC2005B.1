function añadir(){
    var funkos = document.getElementById("n_funko");
    var tamagochis = document.getElementById("n_tamagochi");
    var trajes = document.getElementById("n_traje");

    var c_funkos = funkos.value * 899;
    var c_tamagochis = tamagochis.value * 1750;
    var c_trajes = trajes.value * 2500;
    var total = c_funkos + c_tamagochis + c_trajes;

    let resultado = document.getElementById("fin");
    resultado.innerHTML = `<br><br><h3 id= "alerta"> Total: ${total} IVA: ${total*0.16} </h3> <button onclick="ordenar()">Confirmar compra</button>`;
}

function ordenar(){
alert("¡¡Muchas gracias por tu compra!! :)");
document.getElementById("alerta").innerHTML = `<span class="badge rounded-pill bg-success">Success</span>`;
}