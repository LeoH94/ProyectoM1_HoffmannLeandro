# ProyectoM1_HoffmannLeandro
Proyecto Integrador M1 - SoyHenry

🎨 Colorfly Studio – Generador de paletas de colores

Proyecto integrador del Módulo 1 de la carrera Full Stack Developer (SoyHenry).

Aplicación web que genera paletas de colores aleatorias, muestra el código de cada color en HEX o HSL, permite copiarlo, bloquear los colores que te gustan y guardar tus paletas favoritas.

🔗 Repositorio: ProyectoM1_HoffmannLeandro 🌐 Demo:

✨ Funcionalidades
Generar una paleta aleatoria al cargar la página o al hacer click en Generar paleta.
Elegir la cantidad de colores: 6, 8 o 9.
Elegir el formato en que se muestra el código: HEX o HSL.
Copiar el código del color al portapapeles con un click (siempre se copia en HEX).
Bloquear un color para que se mantenga igual al generar una nueva paleta.
Guardar la paleta actual en el navegador (localStorage).
Ver las paletas guardadas, cargarlas de nuevo o eliminarlas.
Máximo de 5 paletas guardadas: al guardar una más, se elimina la más antigua.
Notificaciones breves que avisan qué pasó (paleta generada, color copiado, etc.).
Texto en blanco o negro según el brillo del color, para que siempre se lea bien.
Diseño responsive (celular, tablet y computadora).

🛠️ Tecnologías utilizadas
Tecnología	Para qué se usó
HTML5	Estructura de la página
CSS3	Estilos, variables, Flexbox, animaciones y diseño responsive
JavaScript (ES6)	Lógica de la aplicación y manejo del DOM
localStorage	Guardar las paletas en el navegador
Git y GitHub	Control de versiones y repositorio del proyecto
Visual Studio Code	Editor de código

📁 Estructura del proyecto


ProyectoM1_HoffmannLeandro/
├── images/
│   └── colorfly_logo.png
├── Desarrollo/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── Documentacion/
    └── README.md


▶️ Cómo usarlo
Descargá o cloná el repositorio:
bash
   git clone https://github.com/LeoH94/ProyectoM1_HoffmannLeandro.git
Abrí el archivo index.html en tu navegador (o usá la extensión Live Server de VS Code).
Elegí la cantidad de colores y el formato.
Hacé click en Generar paleta.
Hacé click en un color para copiar su código, o en el candado 🔓 para bloquearlo.
Usá Guardar paleta para conservarla; después la vas a ver en la sección Paletas guardadas.


🧭 Proceso de desarrollo

Fui construyendo el proyecto por etapas, agregando una funcionalidad por vez.

1. Estructura base (HTML)

Armé el HTML con un encabezado (logo, título y selectores), la zona donde se dibuja la paleta, el botón de guardar, la sección de paletas guardadas y el pie de página. Usé etiquetas semánticas (header, main, section, footer) y label asociados a cada select.

2. Generación de colores aleatorios

Creé dos funciones: una que genera un color HEX (elige 6 caracteres al azar entre 0-9 y A-F) y otra que genera un color HSL (valores aleatorios de tono, saturación y luminosidad).

3. Conversión de HSL a HEX

Como la paleta se guarda en HSL pero el navegador y el portapapeles trabajan cómodamente con HEX, agregué la función hslAHex(). Así el usuario puede ver el color en el formato que elija y siempre copiar el HEX.

4. Dibujar la paleta en pantalla

Cada color se guarda como un objeto { h, s, l, bloqueado } dentro del array colores. La función dibujarPaleta() recorre ese array y crea, con document.createElement, una caja por cada color con su código.

5. Texto legible sobre cualquier color

Con la función colorDeTexto() calculo el brillo del fondo (usando los valores de rojo, verde y azul) y elijo letras negras sobre fondos claros y blancas sobre fondos oscuros.

6. Copiar al portapapeles

Usé navigator.clipboard.writeText() dentro de un try/catch, para avisar al usuario si se copió bien o si hubo un error.

7. Bloquear colores

Cada color tiene la propiedad bloqueado. Al generar una nueva paleta, los colores bloqueados se conservan y solo se reemplazan los demás. El botón cambia entre 🔓 y 🔒 y la caja muestra un borde cuando está bloqueada.

8. Guardar paletas con localStorage

Las paletas se guardan como una lista en localStorage. Cada una tiene un id (con Date.now()), sus colores, la cantidad y el formato. Se permite un máximo de 5: si se supera, se elimina la más antigua con shift(). Las funciones guardarPaleta(), mostrarPaletasGuardadas(), cargarPaletaGuardada() y eliminarPaleta() manejan todo el ciclo. Además, obtenerPaletas() usa try/catch por si el dato guardado estuviera dañado.

9. Notificaciones

Una sola notificación (toast) que aparece unos segundos y desaparece. Antes de mostrar una nueva, se cancela el temporizador anterior con clearTimeout() para que no se pisen los mensajes.

10. Estilos y diseño responsive
Organicé el CSS en secciones numeradas (variables, reset, layout, componentes, estados, animaciones, responsive y accesibilidad).
Usé variables CSS para colores, espaciados, bordes y transiciones, así los cambios se hacen en un solo lugar.
Usé Flexbox para el diseño y unidades relativas (rem).
En pantallas de hasta 768px los colores se apilan en vertical, y hay ajustes extra para celulares chicos (hasta 480px).
El efecto hover (zoom leve con sombra) solo se aplica en dispositivos con mouse, porque en pantallas táctiles el hover queda "pegado".

11. Accesibilidad
aria-label en los botones de copiar y bloquear, y aria-pressed en el de bloqueo.
Notificación con role="status" y aria-live="polite" para lectores de pantalla.
Estilos :focus-visible para poder navegar con el teclado.
prefers-reduced-motion para quitar animaciones a quien lo pidió en su sistema.

12. Control de versiones

Fui subiendo los cambios al repositorio con Git y GitHub:

bash
git add .
git commit -m "Mensaje que describe el cambio"
git push origin main


🚀 Posibles mejoras a futuro
Poder bloquear colores con la barra espaciadora.
Exportar la paleta como imagen o archivo.
Poner nombre a cada paleta guardada.


👤 Autor

Hoffmann Leandro --- GitHub: LeoH94