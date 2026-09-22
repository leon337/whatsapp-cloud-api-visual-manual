# Skill Candidate Blueprint — MCF-BUILD-VISUAL-MANUAL

Status: DRAFT CANDIDATE  
Source case: WhatsApp Cloud API Visual Manual

## Intent

Generalize the validated process used to create visual, guided, testable developer manuals from official documentation.

## Proposed MCF identity

```yaml
skill_id: MCF-BUILD-VISUAL-MANUAL
version: 0.1.0
status: DRAFT
```

## Future trigger examples

- "MESTRE, faça um manual visual desta documentação."
- "Crie um tutorial guiado completo da API X."
- "Transforme esta documentação em um laboratório visual."

## Expected workflow

1. discover official documentation;
2. map architecture and prerequisites;
3. build progressive curriculum;
4. identify UI-driven steps;
5. navigate official interfaces;
6. capture screenshots;
7. separate private originals from publishable evidence;
8. sanitize secrets and personal information;
9. annotate screenshots;
10. create guided and reference modes;
11. build runnable examples;
12. build a practical lab;
13. validate examples;
14. collect QA/evidence;
15. record failures and recoveries;
16. version Alpha/Beta/RC;
17. require human gate before stable promotion;
18. publish the validated artifact.

## Required learning evidence

The Skill Candidate must retain:
- sources and provenance;
- screenshots and annotations;
- decisions;
- failure modes;
- recoveries;
- acceptance tests;
- sanitized publication evidence;
- lessons learned.

## Promotion rule

This candidate must not become ACTIVE based only on the WhatsApp case.

Minimum validation path:
1. WhatsApp case produces an approved manual.
2. A second materially different developer documentation is processed using the same method without re-teaching the workflow.
3. Differences are reconciled into the generalized contract.
4. The skill is evaluated against positive and negative scenarios.
5. LEANDRO approves promotion through the MCF governance process.

## Canonical MCF alignment

When formalized, use:
- skills/registry.yaml
- templates/MCF-SKILL-CONTRACT.yaml
- MCF permission/evidence/governance rules

Do not create a parallel skill system.
