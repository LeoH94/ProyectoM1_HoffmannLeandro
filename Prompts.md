Prompts utilizados con IA – Colorfly Studio

Este documento registra los prompts que usé con una herramienta de IA (Claude) durante el desarrollo de Colorfly Studio, mi proyecto integrador del Módulo 1.

El objetivo es mostrar cómo usé la IA como apoyo para aprender, qué le pedí, qué obtuve y qué entendí/modifiqué yo.

📌 Cómo usé la IA
Como ayuda para entender conceptos que todavía estaba aprendiendo.
Para resolver errores y mejorar mi código.
Siempre leí, probé y adapté las respuestas antes de usarlas en el proyecto.

📝 Registro de prompts

1. Conversión de colores (HSL → HEX)
Qué necesitaba: copiar el código HEX al portapapeles aunque en pantalla se muestre HSL.
Prompt:

![Conversión de colores HSL a HEX](Documentacion/Capturas/ConversionDeColores.png)(Documentacion/Capturas/ConversionDeColores2.png)

Qué obtuve: una función que convierte HSL a HEX.
Qué hice yo con eso: (ej.: la probé con distintos colores y la integré a mi función de copiar).
Archivo: app.js


2. Bloquear un color de la paleta
Qué necesitaba: que un color bloqueado se mantenga al generar una paleta nueva.
Prompt:

![Conversión de colores HSL a HEX](Documentacion/Capturas/BloqueoDeColor.png)(Documentacion/Capturas/BloqueoDeColor2.png)(Documentacion/Capturas/BloqueoDeColor3.png)

Qué obtuve: una forma de guardar la paleta como array de objetos {h, s, l, bloqueado}.
Qué hice yo con eso: (ej.: lo adapté a mi forma de crear los colores con createElement).
Archivo: app.js


3. Guardar paletas en localStorage (máximo 5)
Qué necesitaba: guardar la paleta, mostrar las guardadas y poder cargar una; si hay más de 5, se borran las más antiguas.
Prompt:

![Conversión de colores HSL a HEX](Documentacion/Capturas/GuardarPaleta.png)(Documentacion/Capturas/GuardarPaleta2.png)(Documentacion/Capturas/GuardarPaleta3.png)

Qué obtuve: explicación y código para usar localStorage con un límite de 5 paletas.
Qué hice yo con eso: (completar)
Archivo: app.js