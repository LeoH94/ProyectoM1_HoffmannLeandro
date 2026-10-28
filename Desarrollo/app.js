//Declaracion de variables

const cantidad = document.getElementById("cantidad");
const formato = document.getElementById("formato");
const boton = document.getElementById("generar");
const paleta = document.getElementById("paleta");

//Funcion para generar color HEX

function colorHex () {
    const caracteres = [
    "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "A", "B", "C", "D", "E", "F"];

    let color = "#";

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        color += caracteres[indice];
    }

    return color;
}

//Funcion para generar color HSL

function generarColorHSL(){
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);

    return `hsl(${h}, ${s}%, ${l}%)`;
}
