---
name: Crealia
description: Diseño web profesional en beige, negro y blanco
colors:
  ink: "#222320"
  background: "#f1eee8"
  paper: "#fcfbf8"
  muted: "#60605a"
  field: "#e4e0d8"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(48px, 5.1vw, 76px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.04em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
rounded:
  panel: "8px"
  button: "40px"
spacing:
  gutter: "clamp(22px, 5.5vw, 90px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "16px 25px"
---
# Design System: Crealia

## Overview
Dirección profesional, clara y contenida definida por el usuario y sus referencias. Se conserva la identidad monocroma, con profundidad concentrada en los objetos ilustrativos. Actualización de la dirección clara existente, no sustitución de marca.

## Colors
Fondo beige continuo, papel para formularios y ejemplos, tinta oscura para texto y acciones. Color fotográfico contenido; el verde original ya no dirige la interfaz.

## Typography
Poppins 500 para títulos y marca; Inter para texto y controles. El título móvil usa clamp(40px,10.7vw,58px), con 40px hasta 350px. El texto de lectura mantiene 16px; ilustraciones de dispositivos tienen escala propia y no contienen controles esenciales.

## Layout
Contenedor máximo 1600px. Hero de dos columnas que se apila hasta 800px. Márgenes móviles 22px. Secciones de 112px de separación superior, reducidas a 66px en móvil. Cuestionario en dos columnas en escritorio y una en móvil; una pregunta visible por paso. Intro fija solo en escritorio. Sin secuestro del scroll.

## Elevation & Depth
Sombras suaves en pantalla, capas y teclado para expresar la separación espacial de la referencia. Formulario y selección de funciones se distinguen por superficies tonales.

## Shapes
Botones redondeados, paneles discretamente curvos, opciones rectangulares. La silueta del portátil es ilustrativa; los controles permanecen fuera del modelo.

## Components
Encabezado fijo con contacto. Portátil con separación de capas vinculada al scroll; composición estática con movimiento reducido. Cuatro ejemplos visibles en una grilla de cuatro columnas, dos en móvil. Cada ejemplo abre un diálogo nativo con foco contenido, cierre por Escape y retorno al disparador: fichas de producto, selección de compra, carta o agenda. Todos identificados como demostraciones. Cuestionario con opciones nativas, progreso, validación y regreso sin pérdida de respuestas. En móvil, WhatsApp flotante se oculta al verse el portátil, formulario o pie. El contacto del encabezado permanece disponible. Foco visible y movimiento reducido; ninguna información depende de animaciones.

## Do's and Don'ts
- Do mantener una propuesta explícita y contacto visible.
- Do concentrar las interacciones en ejemplos breves y controles accesibles.
- Don't presentar conceptos ficticios como trabajos de clientes.
- Don't añadir movimiento constante ni información densa.
