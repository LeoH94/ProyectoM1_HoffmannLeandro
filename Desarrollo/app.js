/* ==============================
   GENERADOR DE PALETA DE COLORES
============================== */

//Declaracion de variables

const cantidad = document.getElementById("cantidad");
const formato = document.getElementById("formato");
const boton = document.getElementById("generar");
const paleta = document.getElementById("paleta");

const notificacion = document.getElementById("notificacion");

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

    return { h, s, l };
}


//Funcion para determinar color de Texto

function colorDeTexto(hex) {
  // Sacamos los valores de rojo, verde y azul del código HEX
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Fórmula del "brillo": el ojo humano ve el verde más brillante que el azul
  const brillo = (r * 299 + g * 587 + b * 114) / 1000;

  // Si el fondo es claro, letras negras. Si es oscuro, letras blancas.
  return brillo > 128 ? "#000000" : "#ffffff";
}

//Funcion para converitir HSL a HEX

function hslAHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
} 


//Funcion para copiar color al portapapeles

async function copiarHex(hex) {
  try {
    await navigator.clipboard.writeText(hex);
    mostrarNotificacion(`${hex} copiado`);
  } catch (error) {
    mostrarNotificacion("No se pudo copiar");
  }
}

//Funcion para generar paleta

function generarPaleta() {
  paleta.innerHTML = "";

  for (let i = 0; i < Number(cantidad.value); i++) {
    let color;
    let hex; // renombrado: ahora lo usamos para contraste Y para copiar

    if (formato.value === "hex") {
      color = colorHex();
      hex = color;
    } else {
      const { h, s, l } = colorHsl();
      color = `hsl(${h}, ${s}%, ${l}%)`;
      hex = hslAHex(h, s, l).toUpperCase(); // mayúsculas, igual que colorHex()
    }

    const caja = document.createElement("div");
    caja.className = "color";

    caja.style.backgroundColor = color;
    caja.style.color = colorDeTexto(hex);
    caja.textContent = color;
    caja.dataset.hex = hex; // guardamos el HEX en la caja

    caja.addEventListener("click", () => copiarHex(caja.dataset.hex));

    paleta.appendChild(caja);
  }

  mostrarNotificacion("Paleta generada");
}

//Funcion para mostrar notificacion

let temporizador;

function mostrarNotificacion(mensaje) {
  notificacion.textContent = mensaje;
  notificacion.classList.add("visible");

  clearTimeout(temporizador); // cancela el temporizador anterior
  temporizador = setTimeout(() => {
    notificacion.classList.remove("visible");
  }, 2500);
}

//Eventos

boton.addEventListener("click", generarPaleta); //Genera paleta al hacer click en el boton

cantidad.addEventListener("change", generarPaleta); //Genera paleta al cambiar la cantidad de colores

formato.addEventListener("change", generarPaleta); //Genera paleta al cambiar el formato de color

generarPaleta(); //Genera paleta al cargar la pagina