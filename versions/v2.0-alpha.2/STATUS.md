# v2.0.0-alpha.2 — Incremento 1

Status: DEVELOPMENT / NOT RELEASED

## Implementado

- Modo Guiado;
- Modo Consulta;
- progresso persistente;
- navegação Anterior/Próximo;
- ação "Consegui";
- ajuda contextual "Preciso de ajuda";
- estrutura de profundidade:
  - Faça comigo;
  - Entenda;
  - Engenharia;
- laboratório Node.js + Express;
- health endpoint;
- verificação de webhook;
- recepção de webhook com suporte a validação de assinatura quando App Secret estiver configurado;
- painel observável de eventos;
- simulação local explicitamente identificada.

## QA observado

Workspace:
- Guided mode: PASS
- only current step visible: PASS
- contextual help: PASS
- done state: PASS
- next step: PASS
- reference mode: PASS

Lab:
- node syntax check: PASS
- GET /health: PASS
- GET /webhook verification: PASS
- local simulated event: PASS

## Não implementado ainda

- screenshots privados do Meta App Dashboard;
- sanitização visual automática;
- overlays numerados em screenshots;
- zoom/transições didáticas;
- envio real pela Cloud API;
- webhook real público;
- templates reais;
- promoção Beta/RC.

Nenhum desses itens pendentes deve ser inferido como concluído.
