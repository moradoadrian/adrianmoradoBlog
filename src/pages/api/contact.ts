import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Deshabilitamos el prerendering para que esta ruta se ejecute dinámicamente en el servidor (Vercel)
export const prerender = false;

// Expresión regular para validar formato de correo electrónico
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Obtener y parsear los datos recibidos en la petición
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 2. Validación de campos obligatorios (ninguno debe estar vacío)
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validación del formato de correo electrónico
    if (!EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: 'El correo electrónico proporcionado no es válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Inicializar Resend con la variable de entorno protegida en el servidor
    console.log("API KEY:", import.meta.env.RESEND_API_KEY);
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Error de servidor: La variable de entorno RESEND_API_KEY no está configurada.');
      return new Response(
        JSON.stringify({ error: 'El servicio de mensajería no está configurado en el servidor.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);

    // 5. Enviar el correo usando Resend
    // Nota: Por restricciones de cuentas de prueba de Resend, enviamos "from" desde onboarding@resend.dev 
    // y el destino "to" es tu correo de administrador registrado.
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'cesar.morado.rodriguez@gmail.com',
      subject: 'Nuevo mensaje desde mi Portafolio',
      text: `Nombre: ${name}\n\nCorreo: ${email}\n\nAsunto: ${subject}\n\nMensaje:\n${message}`,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return new Response(
        JSON.stringify({ error: 'Hubo un problema al enviar tu correo. Intenta de nuevo más tarde.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 6. Respuesta exitosa
    return new Response(
      JSON.stringify({ success: true, message: 'Mensaje enviado correctamente.', id: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en API contact:', error);
    return new Response(
      JSON.stringify({ error: 'Ocurrió un error interno en el servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
