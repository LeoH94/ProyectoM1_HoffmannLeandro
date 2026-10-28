/* ==============================
   GENERADOR DE PALETA DE COLORES
============================== */

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

    let colorHex = "#";

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        colorHex += caracteres[indice];
    }

    return colorHex;
}

//Funcion para generar color HSL

function colorHsl () {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

//Funcion para generar paleta

function generarPaleta() {
  paleta.innerHTML = "";

  for (let i = 0; i < Number(cantidad.value); i++) {
    const color = formato.value === "hex" ? colorHex() : colorHsl();

    const caja = document.createElement("div");
    caja.className = "color";
    caja.style.backgroundColor = color;
    caja.textContent = color;
    paleta.appendChild(caja);
  }
}


boton.addEventListener("click", generarPaleta);

generarPaleta();