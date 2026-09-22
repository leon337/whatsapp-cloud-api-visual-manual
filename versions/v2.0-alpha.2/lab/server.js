import express from 'express';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8780);

const state = {
  startedAt: new Date().toISOString(),
  verificationPassed: false,
  lastEventAt: null,
  events: [],
  counters: {
    webhookPosts: 0,
    simulated: 0
  }
};

function pushEvent(event) {
  state.events.unshift(event);
  state.events = state.events.slice(0, 30);
  state.lastEventAt = new Date().toISOString();
}

function verifyMetaSignature(rawBody, signature) {
  const secret = process.env.META_APP_SECRET;
  if (!secret) return { configured: false, valid: null };
  if (!signature?.startsWith('sha256=')) return { configured: true, valid: false };

  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return { configured: true, valid: false };

  return {
    configured: true,
    valid: crypto.timingSafeEqual(a, b)
  };
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'whatsapp-cloud-api-alpha2-lab',
    uptimeSeconds: Math.round(process.uptime()),
    verifyTokenConfigured: Boolean(process.env.WHATSAPP_VERIFY_TOKEN),
    appSecretConfigured: Boolean(process.env.META_APP_SECRET)
  });
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (
    mode === 'subscribe' &&
    process.env.WHATSAPP_VERIFY_TOKEN &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    state.verificationPassed = true;
    pushEvent({
      type: 'webhook.verification',
      at: new Date().toISOString(),
      status: 'PASS'
    });
    return res.status(200).send(challenge);
  }

  pushEvent({
    type: 'webhook.verification',
    at: new Date().toISOString(),
    status: 'FAIL'
  });
  return res.sendStatus(403);
});

app.post('/webhook',
  express.raw({ type: '*/*', limit: '2mb' }),
  (req, res) => {
    const raw = Buffer.isBuffer(req.body) ? req.body : Buffer.from('');
    const signature = verifyMetaSignature(raw, req.get('x-hub-signature-256'));

    if (signature.configured && signature.valid !== true) {
      pushEvent({
        type: 'webhook.signature',
        at: new Date().toISOString(),
        status: 'FAIL'
      });
      return res.sendStatus(401);
    }

    let payload = null;
    try {
      payload = JSON.parse(raw.toString('utf8') || '{}');
    } catch {
      return res.status(400).json({ ok: false, error: 'invalid_json' });
    }

    state.counters.webhookPosts += 1;
    pushEvent({
      type: 'webhook.received',
      at: new Date().toISOString(),
      signature,
      object: payload?.object || null,
      entries: Array.isArray(payload?.entry) ? payload.entry.length : 0
    });

    return res.sendStatus(200);
  }
);

app.get('/api/status', (_req, res) => {
  res.json({
    ok: true,
    ...state,
    config: {
      verifyTokenConfigured: Boolean(process.env.WHATSAPP_VERIFY_TOKEN),
      appSecretConfigured: Boolean(process.env.META_APP_SECRET),
      accessTokenConfigured: Boolean(process.env.WHATSAPP_ACCESS_TOKEN),
      phoneNumberIdConfigured: Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID)
    }
  });
});

app.post('/api/test-event', express.json(), (req, res) => {
  state.counters.simulated += 1;
  const event = {
    type: req.body?.type || 'message.received',
    at: new Date().toISOString(),
    status: 'SIMULATED',
    note: 'Evento local de laboratório; não veio da Meta.'
  };
  pushEvent(event);
  res.json({ ok: true, event });
});

app.post('/api/send', express.json(), (_req, res) => {
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    return res.status(412).json({
      ok: false,
      code: 'META_CREDENTIALS_NOT_CONFIGURED',
      message: 'Configure credenciais privadas para habilitar envio real.'
    });
  }

  return res.status(501).json({
    ok: false,
    code: 'REAL_SEND_NOT_ENABLED_IN_ALPHA2_SCAFFOLD',
    message: 'O envio real será ativado em uma etapa posterior, com gate e validação.'
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`WhatsApp Alpha 2 Lab: http://127.0.0.1:${PORT}`);
});
