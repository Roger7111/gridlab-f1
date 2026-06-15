/**
 * Netlify Scheduled Function — invia email di preview pre-gara
 * Schedule: ogni sabato alle 14:00 UTC (1h prima delle qualifiche tipiche)
 * Config: netlify.toml → [functions."send-preview"] schedule = "0 14 * * 6"
 *
 * Variabili d'ambiente da settare su Netlify:
 *   EMAILJS_SERVICE_ID   — service_4q1s8nb
 *   EMAILJS_TEMPLATE_ID  — ID template EmailJS
 *   EMAILJS_PUBLIC_KEY   — ppxtABMb6NYv8DvYG
 *   EMAILJS_PRIVATE_KEY  — Private key EmailJS (per server-side)
 *
 * Legge i subscriber da Netlify Forms (form "waitlist")
 * Richiede: NETLIFY_API_TOKEN, NETLIFY_SITE_ID
 */

export const config = {
  schedule: "0 14 * * 6",  // ogni sabato 14:00 UTC
};

export default async function handler(req) {
  const NETLIFY_TOKEN = process.env.NETLIFY_API_TOKEN;
  const SITE_ID = process.env.NETLIFY_SITE_ID;
  const EJS_SERVICE = process.env.EMAILJS_SERVICE_ID;
  const EJS_TEMPLATE = process.env.EMAILJS_TEMPLATE_ID;
  const EJS_PUB = process.env.EMAILJS_PUBLIC_KEY;
  const EJS_PRIV = process.env.EMAILJS_PRIVATE_KEY;

  if (!NETLIFY_TOKEN || !SITE_ID) {
    return new Response(JSON.stringify({ error: "Missing Netlify env vars" }), { status: 500 });
  }

  // 1. Leggi iscritti dalla form Netlify
  const formsRes = await fetch(
    `https://api.netlify.com/api/v1/sites/${SITE_ID}/forms`,
    { headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
  );
  const forms = await formsRes.json();
  const waitlistForm = forms.find(f => f.name === "waitlist");
  if (!waitlistForm) {
    return new Response(JSON.stringify({ error: "Waitlist form not found" }), { status: 404 });
  }

  const subRes = await fetch(
    `https://api.netlify.com/api/v1/forms/${waitlistForm.id}/submissions?per_page=500`,
    { headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
  );
  const submissions = await subRes.json();
  const subscribers = submissions
    .filter(s => s.data?.email)
    .map(s => ({ email: s.data.email, nome: s.data.nome || "Appassionato" }));

  // 2. Leggi previsione corrente
  const dataRes = await fetch(`https://${process.env.URL}/data/previsione.json`).catch(() => null);
  let preview = { gp: "prossimo GP", top3: ["—", "—", "—"] };
  if (dataRes?.ok) {
    const data = await dataRes.json();
    preview.gp = data.gp || preview.gp;
    preview.top3 = (data.griglia || []).slice(0, 3).map(r => r.driver);
  }

  // 3. Invia via EmailJS (server-side API)
  let sent = 0, errors = 0;
  for (const sub of subscribers) {
    const body = {
      service_id: EJS_SERVICE,
      template_id: EJS_TEMPLATE,
      user_id: EJS_PUB,
      accessToken: EJS_PRIV,
      template_params: {
        to_email: sub.email,
        to_name: sub.nome,
        gp_name: preview.gp,
        pred_p1: preview.top3[0] || "—",
        pred_p2: preview.top3[1] || "—",
        pred_p3: preview.top3[2] || "—",
        site_url: "https://dreamy-empanada-2f01fb.netlify.app",
      }
    };
    const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) sent++; else errors++;
  }

  return new Response(
    JSON.stringify({ subscribers: subscribers.length, sent, errors }),
    { status: 200 }
  );
}
