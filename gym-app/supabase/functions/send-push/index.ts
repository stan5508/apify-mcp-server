// Sends a web-push notification to one client's registered devices.
//
// Runs on Supabase Edge Functions (Deno). Deploy from the dashboard —
// Edge Functions → Deploy a new function → paste this file — or with the CLI:
//   supabase functions deploy send-push
//
// Secrets it needs (Edge Functions → Secrets):
//   VAPID_PUBLIC_KEY   the same key that sits in the push_config table
//   VAPID_PRIVATE_KEY  its private counterpart (npx web-push generate-vapid-keys)
//   VAPID_SUBJECT      mailto:jij@voorbeeld.nl
//
// Only a signed-in coach can call it; subscriptions are read with the service
// role so RLS on push_subscriptions can stay strict.

import webpush from 'npm:web-push@3';

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

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

    const pub = Deno.env.get('VAPID_PUBLIC_KEY');
    const priv = Deno.env.get('VAPID_PRIVATE_KEY');
    const subject = Deno.env.get('VAPID_SUBJECT') || 'mailto:coach@example.com';
    if (!pub || !priv) return json({ error: 'VAPID-sleutels ontbreken' }, 500);
    webpush.setVapidDetails(subject, pub, priv);

    const token = (req.headers.get('Authorization') || '').replace(/^Bearer /i, '');
    const userId = token && userIdFrom(token);
    if (!userId) return json({ error: 'Niet ingelogd' }, 401);

    const url = Deno.env.get('SUPABASE_URL');
    const anon = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    // only a coach may push, and only to accounts that are actually his clients
    const profileRes = await fetch(`${url}/rest/v1/profiles?id=eq.${userId}&select=role`, {
        headers: { apikey: anon, Authorization: `Bearer ${token}` },
    });
    const profile = (await profileRes.json())[0];
    if (!profile || profile.role !== 'coach') return json({ error: 'Alleen een coach mag meldingen sturen' }, 403);

    let payload;
    try {
        payload = await req.json();
    } catch {
        return json({ error: 'Ongeldige aanvraag' }, 400);
    }
    const clientId = String(payload?.client_id || '');
    const title = String(payload?.title || 'Coachlog').slice(0, 60);
    const body = String(payload?.body || '').slice(0, 140);
    if (!clientId) return json({ error: 'client_id ontbreekt' }, 400);

    const clientRes = await fetch(`${url}/rest/v1/profiles?id=eq.${clientId}&coach_id=eq.${userId}&select=id`, {
        headers: { apikey: service, Authorization: `Bearer ${service}` },
    });
    if (!(await clientRes.json()).length) return json({ error: 'Dit is geen klant van jou' }, 403);

    const subsRes = await fetch(
        `${url}/rest/v1/push_subscriptions?client_id=eq.${clientId}&select=endpoint,subscription`,
        {
            headers: { apikey: service, Authorization: `Bearer ${service}` },
        },
    );
    const subs = await subsRes.json();
    if (!Array.isArray(subs) || !subs.length) return json({ ok: true, sent: 0 });

    let sent = 0;
    for (const row of subs) {
        try {
            await webpush.sendNotification(row.subscription, JSON.stringify({ title, body, url: './sporter.html' }));
            sent++;
        } catch (e) {
            // 404/410 = abonnement bestaat niet meer; ruim de rij op
            const status = (e as { statusCode?: number }).statusCode;
            if (status === 404 || status === 410) {
                await fetch(`${url}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(row.endpoint)}`, {
                    method: 'DELETE',
                    headers: { apikey: service, Authorization: `Bearer ${service}` },
                });
            }
        }
    }
    return json({ ok: true, sent });
});
