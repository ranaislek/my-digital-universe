import { Resend } from 'resend';

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('Missing Env Var: RESEND_API_KEY');
        return new Response(JSON.stringify({ error: 'Missing RESEND_API_KEY environment variable' }), { status: 500 });
    }

    // Log first few chars of key for debugging
    console.log(`[Debug] Using Key: ${apiKey.substring(0, 8)}...`);

    try {
        const resend = new Resend(apiKey);
        const { name, email, message } = await request.json();

        console.log(`[Debug] Sending email from: ${email}`);

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
            console.error('Resend API Error:', error);
            return new Response(JSON.stringify({ error: error.message || error }), { status: 500 });
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error: any) {
        console.error('Internal Function Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email: ' + (error.message || 'Unknown error') }), { status: 500 });
    }
}
