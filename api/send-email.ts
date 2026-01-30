import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
    // Vercel Serverless Function (Node.js) usage
    // req is VercelRequest (IncomingMessage + body), res is VercelResponse

    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('Missing Env Var: RESEND_API_KEY');
        return res.status(500).json({ error: 'Missing RESEND_API_KEY environment variable' });
    }

    // Log first few chars of key for debugging
    console.log(`[Debug] Using Key: ${apiKey.substring(0, 8)}...`);

    try {
        const resend = new Resend(apiKey);

        // Vercel parses JSON body automatically
        const { name, email, message } = req.body;

        console.log(`[Debug] Sending email from: ${email}`);

        const { data, error } = await resend.emails.send({
            from: 'My Digital Universe <onboarding@resend.dev>',
            to: ['islekrana@gmail.com'],
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
            return res.status(500).json({ error: error.message || error });
        }

        return res.status(200).json({ data });
    } catch (error: any) {
        console.error('Internal Function Error:', error);
        return res.status(500).json({ error: 'Failed to send email: ' + (error.message || 'Unknown error') });
    }
}
