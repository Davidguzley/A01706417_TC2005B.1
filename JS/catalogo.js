class Producto{
    constructor(precio){
        this.precio = precio
    }
    
    costoPieza(n){
        let total = n*this.precio;
        return total;
    }

    //Calcula los impuestos pagados por el articulo
    impuestos(cant){
        const IVA = 0.16*cant;
        return (IVA);
    }
}

const telefono = new Producto(15999);
const guante = new Producto(2500);
const jordan = new Producto(4850);

function comprar(){
    let boton =  document.getElementById("comprar");
    boton.onclick = () => {
        let cantidad = document.getElementById("cant").value;
    }
}