import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { name, email, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'My Digital Universe <onboarding@resend.dev>',
            to: ['islekrana@gmail.com'], // Send to yourself
            subject: `New Message from ${name} (${email})`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
          ${message}
        </blockquote>
      `,
        });

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
