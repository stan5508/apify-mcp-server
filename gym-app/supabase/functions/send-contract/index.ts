// Mails a signed contract to a client, with the PDF as an attachment.
//
// Runs on Supabase Edge Functions (Deno). Deploy it from the dashboard —
// Edge Functions → Deploy a new function → paste this file — or with the CLI:
//   supabase functions deploy send-contract
//
// Secrets it needs (Edge Functions → Secrets):
//   RESEND_API_KEY  key from resend.com
//   MAIL_FROM       verified sender, e.g. "Coachlog <contract@jouwdomein.nl>"
//
// Only a signed-in coach of this project can call it: Supabase verifies the JWT
// and the code below checks that the caller's profile has the coach role.

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const MAX_PDF_BYTES = 6_000_000;

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

// the platform already verified the signature; this only reads the subject
function userIdFrom(token: string): string | null {
    try {
        const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(part)).sub || null;
    } catch {
        return null;
    }
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
    if (req.method !== 'POST') return json({ error: 'Alleen POST' }, 405);

    const apiKey = Deno.env.get('RESEND_API_KEY');
    const from = Deno.env.get('MAIL_FROM');
    if (!apiKey || !from) return json({ error: 'RESEND_API_KEY of MAIL_FROM ontbreekt' }, 500);

    const token = (req.headers.get('Authorization') || '').replace(/^Bearer /i, '');
    const userId = token && userIdFrom(token);
    if (!userId) return json({ error: 'Niet ingelogd' }, 401);

    // a client account must not be able to use this as a mail relay
    const url = Deno.env.get('SUPABASE_URL');
    const anon = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const profileRes = await fetch(`${url}/rest/v1/profiles?id=eq.${userId}&select=role,name`, {
        headers: { apikey: anon, Authorization: `Bearer ${token}` },
    });
    const profile = (await profileRes.json())[0];
    if (!profile || profile.role !== 'coach') return json({ error: 'Alleen een coach mag contracten mailen' }, 403);

    let payload;
    try {
        payload = await req.json();
    } catch {
        return json({ error: 'Ongeldige aanvraag' }, 400);
    }
    const { to, subject, text, filename, pdf, copyTo } = payload || {};
    if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(to))) return json({ error: 'Geen geldig e-mailadres' }, 400);
    if (!pdf || String(pdf).length > MAX_PDF_BYTES) return json({ error: 'Bijlage ontbreekt of is te groot' }, 400);

    const mail: Record<string, unknown> = {
        from,
        to: [String(to)],
        subject: String(subject || 'Trainingsovereenkomst'),
        text: String(text || ''),
        attachments: [{ filename: String(filename || 'contract.pdf'), content: String(pdf) }],
    };
    if (copyTo && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(copyTo))) {
        mail.bcc = [String(copyTo)];
        mail.reply_to = String(copyTo);
    }

    const sent = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(mail),
    });
    const result = await sent.json().catch(() => ({}));
    if (!sent.ok) return json({ error: result?.message || `Versturen mislukt (${sent.status})` }, 502);
    return json({ ok: true, id: result?.id || null });
});
