# Demos de Crealia

Cinco marcas ficticias, páginas independientes y enlaces directos:
- demos/barberia/ — Distrito: selección de servicio y turno.
- demos/moda/ — Forma: carrusel circular, categorías, talles y selección de prendas.
- demos/comida/ — Mordida: neobrutalismo, carta y pedido de prueba.
- demos/cafeteria/ — Miga: carta y combinaciones de café.
- demos/estetica/ — Aura: galería acordeón y selección de ritual.

El prefijo público es https://mateorzgy.github.io/Crealia/. Las páginas se enlazan desde #posibilidades y cada demo tiene Copiar enlace. Los CTA abren un borrador de WhatsApp a Crealia; no envían mensajes solos.

Productos, precios UYU, marcas, horarios y disponibilidad son ilustrativos. No hay cobros, reservas ni envíos de pedidos. La selección se conserva durante la visita y se borra al recargar. No se recopilan datos personales.

## Archivos
HTML/CSS/JS estático servido directamente. demo.css y demo.js contienen la base; expressive.css contiene Mordida y ajustes de galerías. interactive.js e interactive.css son bundles listos para publicar, con React, GSAP y los componentes originales de React Bits. No se necesita Node en el servidor.

Para reconstruir solo las galerías: entrar en demos/components, instalar las dependencias de package.json y ejecutar npm run build. Los archivos originales y licencias están en esa carpeta. El generador de contenido del entorno de trabajo es build-demos.mjs; después se ejecuta enhance-demos.mjs para insertar las islas. La home se integra con integrate-demos.mjs.

## Fuentes y licencias
Archivos fotográficos de referencia en assets/sources.json, con URL original y licencia Unsplash. Las fotos ilustran conceptos ficticios; no son trabajos de clientes ni prueba de prestaciones de un negocio. No se dispone de metadatos completos de fotógrafo para todos los archivos; no se inventaron atribuciones. Créditos públicos: creditos.html.

Inter y Poppins: SIL Open Font License en assets del sitio. Zodiak de Indian Type Foundry, distribuida por Fontshare: https://www.fontshare.com/licenses/itf-ffl .

CircularCarousel y AccordionGallery: React Bits, David Haz; licencia MIT + Commons Clause incluida en components/REACT-BITS-LICENSE.md. Integrados como parte de este sitio, no ofrecidos como biblioteca independiente. Neobrutalism Components: ekmas, licencia MIT en components/NEOBRUTALISM-LICENSE.txt. Sus reglas de botones se adaptaron al CSS de Mordida.

La home conserva su carrusel original de JavaScript. Forma y Aura utilizan los componentes originales. El sistema de diseño documentado se limita a esta carpeta; no reemplaza el diseño general de Crealia.

Forma: seis looks fotografiados y doce prendas ilustrativas. Los puntos de cada look enlazan a fichas accesibles con talla/medida y selección local. Datos: components/looks.json. No regenerar el HTML con build-demos sin preservar estas mejoras.

Mordida: 12 opciones, filtros, ficha modal con cantidad y pedido local. Ilustración de hamburguesa creada con la herramienta integrada image_gen, guardada en assets/burger-layers.png; seis capas compuestas con recortes SVG y progreso de scroll. Prompt: hamburguesa fotorrealista desarmada en seis capas alineadas (pan, vegetales, cheddar, carne, carne con cheddar, base), vista frontal, textura de estudio, sin texto.
Miga: carta de diez opciones para llevar y pedido local; escena fotográfica generada con IA y chorro animado de servido, reproducción automática al entrar y botón para repetir. Movimiento reducido muestra taza servida.

coffee-ritual.png creado con image_gen integrado: fotografía de estudio de cafetera verde suspendida sobre taza de cerámica, fondo salvia, sin chorro (animado en código). espresso.jpg: Unsplash photo-1510707577719-ae7c14805e3a.

Aura: cortinas con botones sin navegación, reproducción cada5s solo en pantalla y pestaña visible, pausa al interactuar y control de reproducción. Movimiento reducido desactiva autoavance. Selector de ritual transmite elección a agenda; escena fotográfica con apertura ligada al scroll.

Distrito: lookbook con swipe nativo y tres cortes de referencia; ticket dinámico según estilo, servicio, día y hora. Descarga .txt explícitamente marcada sin reserva. Asset assets/distrito-styles.png generado con image_gen integrado: tríptico fotográfico de tres hombres adultos con fade, raya clásica y rulos/textura, iluminación de estudio y fondo neutro.

Las tres imágenes generadas tienen versiones JPEG calidad88 para servir en móvil; se conservan los PNG originales como fuente. La web usa los .jpg optimizados.

Revisión final: interacciones verificadas en390,768 y1440px; smoke test360px de las cinco demos sin errores JS, imágenes rotas, anclas faltantes ni overflow. Verificado movimiento reducido; swipe táctil real de la home mueve288px sin navegación accidental. Cada etapa se publicó por separado.
