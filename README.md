# Crealia
Ejecutá `npm run dev` y visitá http://127.0.0.1:4173. No requiere instalar dependencias. Hosting: GitHub Pages. Dominio propio pendiente.

Versión actual: v3. Portada explícita sobre diseño web, computadora con capas interactivas y cuatro ejemplos compactos: filtros de catálogo, contador de productos, carta y horarios. Son ilustraciones, sin compras ni reservas reales.

Cuestionario de cuatro pasos con resumen para WhatsApp. Conserva respuestas al retroceder, solo en memoria; sin backend ni almacenamiento persistente. El visitante decide enviar el mensaje. Instagram @crealia_uy; WhatsApp +59892050059.

WhatsApp está en el encabezado. El botón fijo móvil se oculta sobre la computadora, el formulario y el pie para no tapar controles. Movimiento reducido compatible.

Archivos: index.html, styles.css, app.js. Recursos locales en assets; fuentes fotográficas en creditos.html. Referencias en fotos, versiones anteriores en .history/v1 y .history/v2. Los conceptos no son trabajos de clientes.

Con el servidor iniciado, `node verify-v3.mjs` ejecuta 44 comprobaciones usando el módulo de design-taste-frontend instalado en esta máquina. `npm run check` verifica sintaxis. Las pruebas no envían mensajes. Servidor solo para vista previa local.

RTK, Headroom y Caveman no quedaron instalados. No hubo cambios globales. Publicación actualizada en GitHub Pages.

## Actualización v4
Portátil animado por scroll sin barra. Cuatro ejemplos visibles juntos abren experiencias accesibles en un diálogo: catálogo con fichas y filtros, tienda con talles y selección, carta con ingredientes y agenda con servicio/día/horario. Los datos son ilustrativos.

Reseñas preparadas en reviews-data.js, vacío hasta recibir testimonios reales. La sección se oculta sin datos. Con varias reseñas avanza cada cinco segundos; permite pausar, respeta movimiento reducido y se detiene fuera de vista, al enfocar o al pasar el puntero. No hay conexión con Google.

Repositorio publicado: https://github.com/Mateorzgy/Crealia
Web: https://mateorzgy.github.io/Crealia/
La copia Git está en la subcarpeta Crealia. GitHub Pages publica los cambios enviados a su rama; guardar en VS Code por sí solo no hace push.
Pruebas actuales: node verify-v4.mjs.

## Reseñas con invitación y aprobación
Prueba interactiva: resenas-admin.html?demo=1. Datos ficticios guardados solo en ese navegador, aislados de la portada.
Panel real: resenas-admin.html. Formulario privado: opinion.html con token en el fragmento de la URL.
La integración Supabase está preparada pero todavía NO configurada. Seguir RESEÑAS.md.
Con Supabase activado, aprobar una reseña la hace visible al cargar la web sin editar archivos ni desplegar.
No hay publicación libre: solo invitaciones únicas y aprobación administrativa. El enlace se comparte manualmente; no hay notificaciones ni mensajes automáticos.
Pruebas del cliente API: npm test. Sintaxis: npm run check.

## Reseñas en portada
La sección está después de los ejemplos. Lee opiniones aprobadas desde Supabase y muestra tarjetas superpuestas. El avance automático se activa con dos o más opiniones y se puede pausar. Opiniones largas expandibles. Con una reseña no se duplican testimonios; las otras capas son decorativas. Con cero reseñas se muestra un mensaje honesto. Las reseñas cuyo autor o negocio contiene “prueba” o “test” se identifican como pruebas. No aprobar datos ficticios como experiencias reales.
