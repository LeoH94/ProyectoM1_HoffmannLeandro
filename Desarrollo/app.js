/* ==============================
   GENERADOR DE PALETA DE COLORES
============================== */

//Declaracion de variables

const cantidad = document.getElementById("cantidad");
const formato = document.getElementById("formato");
const boton = document.getElementById("generar");
const paleta = document.getElementById("paleta");

const notificacion = document.getElementById("notificacion");

let colores = []; // cada color: { h, s, l, bloqueado }

const btnGuardar = document.getElementById("btn-guardar");

const contenedorGuardadas = document.getElementById("paletas-guardadas");
const CLAVE = "paletasGuardadas";
const MAXIMO_PALETAS = 5;

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


//Funcion para generar paleta (respeta los bloqueados)

function generarPaleta() {
  const nuevos = [];

  for (let i = 0; i < Number(cantidad.value); i++) {
    if (colores[i] && colores[i].bloqueado) {
      nuevos.push(colores[i]); // bloqueado: se queda igual
    } else {
      const { h, s, l } = colorHsl();
      nuevos.push({ h, s, l, bloqueado: false });
    }
  }

  colores = nuevos;
  dibujarPaleta();
  mostrarNotificacion("Paleta generada");
}

//Funcion para dibujar la paleta en pantalla

function dibujarPaleta() {
  paleta.innerHTML = "";

  colores.forEach((c) => {
    const hex = hslAHex(c.h, c.s, c.l).toUpperCase();
    const texto = formato.value === "hex" ? hex : `hsl(${c.h}, ${c.s}%, ${c.l}%)`;

    const caja = document.createElement("div");
    caja.className = "color";
    caja.style.backgroundColor = hex;
    caja.style.color = colorDeTexto(hex);
    caja.textContent = texto;
    caja.dataset.hex = hex;

    if (c.bloqueado) caja.classList.add("bloqueado");

    // Boton de bloqueo
      const btn = document.createElement("button");
      btn.className = "btn-bloquear";
      btn.textContent = c.bloqueado ? "🔒" : "🔓";
      btn.title = c.bloqueado ? "Color bloqueado" : "Color desbloqueado";

    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // evita que se copie el color al tocar el candado
      c.bloqueado = !c.bloqueado;
      btn.textContent = c.bloqueado ? "🔒" : "🔓";
      btn.title = c.bloqueado ? "Color bloqueado" : "Color desbloqueado";
      caja.classList.toggle("bloqueado", c.bloqueado);

      const hex = hslAHex(c.h, c.s, c.l).toUpperCase();
      mostrarNotificacion(
        c.bloqueado ? `${hex} bloqueado` : `${hex} desbloqueado`
      );
    });

    caja.appendChild(btn);
    caja.addEventListener("click", () => copiarHex(caja.dataset.hex));

    paleta.appendChild(caja);
  });
}


//Funcion para leer la lista de paletas guardadas

function obtenerPaletas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch (error) {
    return []; // si el dato está dañado, empieza con lista vacía
  }
}

//Funcion para guardar la paleta actual (se suma a la lista)

function guardarPaleta() {
  const lista = obtenerPaletas();

  lista.push({
    id: Date.now(),
    colores: colores.map((c) => ({ h: c.h, s: c.s, l: c.l })),
    cantidad: cantidad.value,
    formato: formato.value,
  });

  // Si hay más del máximo, elimina las primeras (las más antiguas)
  while (lista.length > MAXIMO_PALETAS) {
    lista.shift();
  }

  localStorage.setItem(CLAVE, JSON.stringify(lista));
  mostrarPaletasGuardadas();
  mostrarNotificacion("Paleta guardada");
}

//Funcion para mostrar las paletas guardadas en pantalla

function mostrarPaletasGuardadas() {
  contenedorGuardadas.innerHTML = "";

  const lista = obtenerPaletas();

  if (lista.length === 0) {
    contenedorGuardadas.textContent = "Todavía no guardaste ninguna paleta";
    return;
  }

  lista.forEach((p) => {
    const item = document.createElement("div");
    item.className = "paleta-guardada";

    // Muestras de color (cuadraditos)
    const muestras = document.createElement("div");
    muestras.className = "muestras";

    p.colores.forEach((c) => {
      const muestra = document.createElement("span");
      muestra.className = "muestra";
      muestra.style.backgroundColor = hslAHex(c.h, c.s, c.l);
      muestras.appendChild(muestra);
    });

    // Boton cargar
    const btnCargar = document.createElement("button");
    btnCargar.textContent = "Cargar";
    btnCargar.addEventListener("click", () => cargarPaletaGuardada(p.id));

    // Boton eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarPaleta(p.id));

    item.append(muestras, btnCargar, btnEliminar);
    contenedorGuardadas.appendChild(item);
  });
}

//Funcion para cargar una paleta guardada en la pantalla principal

function cargarPaletaGuardada(id) {
  const elegida = obtenerPaletas().find((p) => p.id === id);
  if (!elegida) return;

  colores = elegida.colores.map((c) => ({ ...c, bloqueado: false }));
  cantidad.value = elegida.cantidad;
  formato.value = elegida.formato;

  dibujarPaleta();
  mostrarNotificacion("Paleta cargada");
}

//Funcion para eliminar una paleta guardada

function eliminarPaleta(id) {
  const lista = obtenerPaletas().filter((p) => p.id !== id);
  localStorage.setItem(CLAVE, JSON.stringify(lista));
  mostrarPaletasGuardadas();
  mostrarNotificacion("Paleta eliminada");
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

formato.addEventListener("change", dibujarPaleta); //Genera paleta al cambiar el formato de color

btnGuardar.addEventListener("click", guardarPaleta); //Guarda la paleta al hacer click en el boton

generarPaleta(); // Genera paleta al cargar la pagina

mostrarPaletasGuardadas(); //Muestra las paletas guardadas al cargar la pagina
