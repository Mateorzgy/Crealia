# Revisión v3
Implementados: propuesta explícita de páginas web, computadora con capas interactivas, cuatro ejemplos compactos, textos profesionales y cuestionario progresivo con resumen para WhatsApp.

## Verificación
44/44 comprobaciones pasaron en 1440, 768, 390 y 320 px: sin desbordamiento horizontal, control de capas, ejemplos funcionales, validación, conservación de respuestas al retroceder, selección exclusiva de asesoramiento, resumen codificado sin inyección y ausencia de errores de consola. Evidencia: .impeccable/review-v3/tests.json. Sintaxis JavaScript verificada.

Capturas finales en .impeccable/review-v3: 1440-hero.jpg, 390-hero.jpg, 1440-feature.jpg, 390-feature.jpg, 1440-quiz.jpg y 390-quiz.jpg. Inspección general en .taste-skill/v3 anterior al último ajuste móvil: 0 fallos y 7 advertencias. No se afirma cero advertencias automáticas. Incluyen tamaño tipográfico en ilustraciones, falta de vídeo, intro fija y evaluación automática del titular; anchura móvil corregida y comprobada después.

## Revisión final directa
Disposición: lista para revisar localmente. La revisión independiente v3 no pudo completarse por límite de uso del agente; esta conclusión es directa, no una aprobación independiente.
- Persistencia: implementación guardada; contactos reales conservados; respuestas solo en memoria.
- Fidelidad: beige, negro y blanco, propuesta explícita y capas basadas en la referencia con contenido ilustrativo propio.
- Techo: computadora construida en CSS, fotos de stock; verificado en navegador, no en teléfonos físicos.
- Correcciones materiales: escala móvil, separación del control, legibilidad auxiliar y botón fijo oculto donde podría tapar controles.
- Conservar: contacto superior, ejemplos seleccionables, cuestionario breve y movimiento reducido.

## Alcance
No se enviaron mensajes ni se publicó el sitio. Las pruebas verifican la URL de WhatsApp; el cliente decide enviar el borrador. Hosting pendiente. No hay compras, pagos ni reservas reales.

Fotos locales de Unsplash, fuentes en creditos.html. Autoría individual no verificada, sin atribuciones inventadas. Conceptos ficticios, no portfolio real. Versiones anteriores en .history/v1 y .history/v2.

## Revisión v4
44/44 comprobaciones funcionales en 1440, 768, 390 y 320px. Probados los cuatro diálogos, filtros/fichas, selección de talles, quitar productos, ingredientes, día/horario, cierre, anchura y cuestionario completo. Movimiento por scroll medido en 1440, 390 y 320px: la separación cambia al avanzar 200px. Sin desbordamiento de diálogo. Capturas en .impeccable/review-v4. La revisión se realizó directamente; no se atribuye aprobación independiente.
Reseñas sin datos reales: sección preparada y oculta. No integración Google ni testimonios inventados.

## Sistema de reseñas — 9/11/2026
Implementados formulario privado, panel de aprobación, invitaciones de un uso, conexión de lectura de reseñas publicadas y demo aislada en el navegador. La migración SQL y autenticación Supabase están preparadas, pendientes de crear/configurar el proyecto del usuario. No se afirma que la integración esté operativa.
39/39 pruebas de recorrido de la demo en 1440, 390 y 320px: invitación, campos requeridos, pendiente sin publicación, puntuación baja publicable, texto seguro, un uso, revocación, ocultación y ausencia de datos de prueba en la portada. Corregida la recarga del estado al cambiar el token de la URL.
6/6 pruebas del cliente API con respuestas simuladas: no envíos sin configuración, clave pública, sesión administrativa, rechazo de usuario no autorizado, cierre de sesión y errores recuperables.
La SQL no se ejecutó en una base real; RLS, autenticación y concurrencia deben comprobarse al conectar Supabase. No se enviaron invitaciones ni mensajes a clientes.

## Conexión Supabase verificada
El proyecto configurado responde: listado público 200 con cero reseñas; invitación inválida devuelve valid:false; listado administrativo y creación de invitaciones rechazan acceso anónimo con 401. El usuario ejecutó la migración SQL correctamente.
Pendiente: crear/autorizar el usuario administrador y verificar el recorrido real autenticado, incluidos envío único y moderación.

## Formulario de reseñas mejorado
Cinco estrellas SVG con selección animada, teclado y movimiento reducido. Errores por campo con resumen y foco en el primer dato faltante. Comentario opcional, sin mínimo y con máximo de 1200 caracteres. Frases rápidas opcionales y editables; no sobrescriben lo escrito, no duplican frases ni predeterminan una opinión positiva.
El usuario ejecutó supabase/reviews-optional-text.sql con Success. Una petición sin texto y con token inválido alcanza la validación del token (ya no falla por longitud), sin insertar datos.
36/36 comprobaciones en 1440, 390 y 320 px: estrellas, corrección de errores, teclado, movimiento reducido, frases sin duplicación, envío corto, puntuación sin comentario, reintento sin pérdida de texto y ausencia de desbordamiento/errores de consola. Capturas locales en .impeccable/reviews-form-v2.

## Presentación de reseñas en portada
La sección se ubica después de los ejemplos y antes de servicios. Diseño de tarjetas superpuestas en blanco, negro y beige; estrella, comentario, iniciales y autor. Una opinión mantiene una tarjeta central con dos planos decorativos sin contenido inventado; varias opiniones habilitan flechas, contador, pausa y avance cada 6,5 segundos. Se detiene fuera de vista, al interactuar, al leer una opinión expandida y con movimiento reducido.
Comentarios largos expandibles; puntuaciones sin texto se indican como tales. Estado vacío visible y carga fallida con reintento. La reseña aprobada “Reseña de Prueba” está identificada explícitamente como prueba. No se añadieron testimonios a Supabase.
42/42 verificaciones en navegador: contenido real, estados de una/varias/cero opiniones, etiquetas de prueba, navegación, expansión, escape de texto, movimiento reducido, pausa, avance automático y anchura móvil. Datos múltiples simulados solo en el navegador. Capturas en .impeccable/reviews-deck. Ajustadas las vistas laterales para que las opiniones largas no tapen los controles.

## Identidad, accesos y color
Logo Crealia visible en panel, formulario, créditos y pie de portada; favicon añadido a Créditos. Acceso Panel en el pie. Los enlaces Volver a la web y marcas de páginas secundarias apuntan a https://mateorzgy.github.io/Crealia/.
Acentos salvia discretos en CTA principal, formulario, franja introductoria, reseñas y contacto. Base beige conservada.
Carrusel automático cada 6 segundos con dos o más reseñas; el cursor sobre el título ya no lo bloquea. Pausa sobre la tarjeta activa, foco visible de teclado, pestaña oculta, fuera de vista, opinión expandida o movimiento reducido. Reproducir con clic vuelve a activar el avance.
39 comprobaciones de marca, enlaces, favicon y anchura en 1440, 390 y 320px. Tres pruebas adicionales de avance, pausa y reanudación con clic real. Capturas en .impeccable/brand-navigation. Actualmente una sola reseña pública; no se duplica para simular rotación.

## Atajos de reseñas — 10/11/2026
Por pedido del titular, se muestran cuatro frases positivas opcionales. No hay selección automática, cambios en la puntuación ni bloqueo de comentarios escritos libremente. Botones grandes con Agregar/Agregada, fondo de selección y aviso visible persistente con aria-live. En móvil se apilan en una columna. Los atajos conservan el texto, evitan duplicados y vuelven al estado Agregar cuando se borra la frase.
27 comprobaciones funcionales en 1440, 390 y 320px: opciones, estado seleccionado, aviso, texto conservado, no duplicados, cinco puntuaciones disponibles, sincronización al editar, confirmación y ausencia de desbordamiento.
