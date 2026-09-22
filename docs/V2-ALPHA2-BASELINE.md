# WhatsApp Cloud API Visual Manual — v2.0.0-alpha.2 Baseline

Status: APPROVED by LEANDRO  
Date: 2026-09-21  
Branch: v2-alpha2

## Product intent

The Alpha 2 must feel like a specialist is beside the learner, teaching, validating, troubleshooting and progressively explaining the WhatsApp Cloud API from beginner to advanced depth.

## Experience modes

### Guided Mode
One task at a time, with:
- real screenshot;
- full-screen context;
- highlighted area;
- zoom;
- arrow/circle/number annotation;
- explicit "click here" instruction;
- expected result;
- "I did it" / "I need help" actions;
- contextual troubleshooting.

### Reference Mode
Non-linear, searchable documentation for experienced users.

## Progressive depth

Every major step provides:
1. Make it with me — minimal practical instruction.
2. Understand — architecture and concepts.
3. Engineering — API details, security, retries, idempotency, logs, edge cases and production concerns.

## Visual evidence standard

For UI-driven steps:
1. capture the real source screen;
2. preserve a private original where needed;
3. identify sensitive content;
4. sanitize before publication;
5. produce annotated variants;
6. show full context + zoom;
7. number the action sequence;
8. show the expected post-action state.

Public repository content must never expose access tokens, secrets or private user data.

## Practical lab

Primary stack: Node.js + Express.

The tutorial must include a working lab with observable state for:
- Express server;
- webhook endpoint;
- Meta verification;
- message received;
- message sent;
- delivery/read status where available;
- templates;
- event log.

Code is presented in three levels:
1. Copy — minimal working code.
2. Understand — line-by-line explanation.
3. Production — hardening and operational concerns.

## MESTRE Workspace roles

The Workspace is both:
- production environment for researching/capturing/building the manual;
- learner copilot for opening official docs, validating state and helping with errors.

Automation rule:
ORCA/AT-SPI for semantic observation + Agent Bridge/programmatic browser control for actions. Do not depend on physical mouse/keyboard coordinates when a semantic/programmatic interface exists.

## Learning artifact structure

The production process must preserve enough evidence to later generalize into an MCF Skill Candidate:

- research/
- sources/
- screenshots/
  - private/
  - sanitized/
  - annotated/
- examples/
- lab/
- qa/
- evidence/
- decisions/
- failures/
- recoveries/
- lessons-learned/
- manifest/

Private evidence is not automatically published.

## Acceptance criteria

Alpha 2 is successful when a learner can:
- understand the integration architecture;
- perform setup steps;
- see exactly where to click;
- obtain a working WhatsApp Cloud API integration;
- send and receive test traffic;
- understand errors and recover;
- progress from beginner guidance to engineering detail.

In parallel, the MCF process must retain enough evidence to answer:
"How was this manual produced, and how can the same method produce another manual?"

## Versioning

- main: stable V1 line.
- v2-screenshots: Alpha 1 checkpoint, preserved.
- v2-alpha2: active Alpha 2 implementation.
- no merge to main until review and HUMAN_GATE.
- no v2.0.0 release until Alpha -> Beta -> RC validation is complete.
