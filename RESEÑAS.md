# Activar reseñas privadas en Crealia

## Lo que ya está preparado
- Formulario accesible desde un enlace aleatorio de 256 bits: una invitación, un envío, vencimiento a los 30 días y posibilidad de revocar.
- Reseñas pendientes hasta que el administrador las apruebe. La puntuación no determina la aprobación.
- Panel privado con inicio de sesión. Los visitantes no pueden crear invitaciones ni aprobar reseñas.
- La portada consulta solo las reseñas aprobadas. Sin copiar comentarios ni hacer un commit por cada opinión.
- Prueba aislada: resenas-admin.html?demo=1. Guarda datos ficticios solo en ese navegador, nunca en la portada.
- Compartir el enlace de invitación con el cliente sigue siendo manual. No hay envío automático por WhatsApp ni emails.
- Quien posea la invitación podrá usarla: no es una comprobación de identidad. No compartirla públicamente.

## Configuración única
1. Crear una cuenta y un proyecto en https://supabase.com/dashboard. Revisar el plan y sus límites antes de confirmar. Guardar la contraseña de la base de datos fuera del repositorio.
2. En el SQL Editor del proyecto NUEVO, ejecutar supabase/reviews.sql una sola vez.
3. En Authentication, crear TU usuario administrador con email y contraseña. No compartir la contraseña. Desactivar registros públicos para este proyecto; el formulario de reseñas no crea cuentas.
4. Copiar el UUID de tu usuario y ejecutar en SQL Editor:
   insert into crealia_reviews_private.review_admins(user_id) values ('UUID-DE-TU-USUARIO');
5. Obtener Project URL y la clave publishable (sb_publishable_...) desde el proyecto. Configurarlas en reviews-config.js. Una clave anon heredada también sirve. NUNCA pegar una secret key ni service_role en la web.
6. Publicar reviews-config.js mediante Git. Abrir resenas-admin.html sin ?demo=1 e iniciar sesión.
7. Crear una invitación de ensayo y probar el recorrido completo real con un comentario inequívocamente de prueba; ocultarlo al terminar. Probar también el enlace usado, revocado y vencido, y una cuenta que no sea administradora.
8. Cuando la integración esté verificada, usar invitaciones con clientes reales. Abrir la web de nuevo tras aprobar para ver la reseña.

## Uso habitual
Crear invitación → copiar enlace privado → enviarlo al cliente → revisar bandeja → aprobar u ocultar.
No hace falta editar archivos ni desplegar para cada reseña.
La bandeja se actualiza con “Actualizar”; no hay notificaciones de email configuradas.
El administrador inicia sesión otra vez al recargar la página: la contraseña y el token no se guardan en el navegador.

## Datos y controles
Solo se publica nombre elegido, negocio opcional, puntuación y texto autorizados. El consentimiento es obligatorio y el formulario informa cómo solicitar retirada. Una reseña publicada puede ocultarse. Los tokens se guardan hasheados y nunca se devuelven desde el listado administrativo; el enlace se muestra solo al crearlo. No recuperar enlaces antiguos: revocar y crear otro.

Las tablas están en un esquema privado, con RLS activada y sin acceso directo de anon/authenticated. La API permite solamente funciones concretas. Las operaciones administrativas verifican el UUID autorizado en el servidor. El envío bloquea la invitación durante la transacción, evitando que dos envíos simultáneos la reutilicen.

## Validación pendiente de la cuenta real
El código y la demostración pueden probarse localmente. La ejecución de SQL, los permisos reales, autenticación y concurrencia solo quedan verificados al conectar y probar un proyecto Supabase. No se presenta la demo local como backend seguro ni como integración ya activada.

Fuentes oficiales:
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/auth/passwords

