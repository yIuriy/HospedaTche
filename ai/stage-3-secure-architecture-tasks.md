# Stage 3 - Secure Architecture Task Division

This document defines the minimum Stage 3 work division. Stage 3 converts prioritized Stage 2 risks into verifiable security requirements and architecture decisions.

## Shared Goal

```text
high or critical risk -> security requirement -> CWE/OWASP mapping -> architecture control -> justified decision
```

## Shared Rules

- Select only three high or critical risks from Stage 2.
- Keep every requirement specific and verifiable.
- Use recognized CWE or OWASP references.
- Show where the selected controls exist in the architecture.
- Keep the diagram source and exported image in GitHub.
- A complete application implementation is not required.

## Minimum Deliverable

- three security requirements derived from selected risks;
- three CWE or OWASP vulnerability mappings;
- one secure architecture diagram;
- three justified architecture decisions.

Recommended outputs:

```text
artifacts/secure-architecture/secure-architecture.md
artifacts/diagrams/secure-architecture.mmd
artifacts/diagrams/secure-architecture.png
```

## Required Traceability

Each requirement must record:

| Field | Required Content |
| --- | --- |
| ID | SR01, SR02, or SR03 |
| Source Risk | High or critical risk from Stage 2 |
| Requirement | Mandatory security behavior |
| Verification Criterion | Observable pass or fail condition |
| Vulnerability Mapping | Relevant CWE or OWASP reference |

Each architecture decision must record the problem, decision, justification, affected component, and expected result.

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Select one identity-related risk and write SR01 with one CWE/OWASP mapping. | SR01 and mapping 1 |
| Sidnei | Select one authentication or authorization risk and write SR02 with one CWE/OWASP mapping. | SR02 and mapping 2 |
| Lara | Select one accommodation or operational risk and write SR03 with one CWE/OWASP mapping. | SR03 and mapping 3 |
| Dyonathan | Build the secure architecture diagram and place the three controls in it. | Diagram source and exported image |
| Rafaela | Write AD01, AD02, and AD03 and consolidate traceability among risks, requirements, mappings, controls, and components. | Three decisions and integrated document |

## Diagram Minimum Content

The diagram must show:

- users and staff roles;
- application interface or client;
- authentication service;
- server-side authorization rules;
- application or API;
- database;
- audit logs or monitoring;
- relevant external services, such as payment provider;
- main trust boundaries and selected controls.

## Shared Final Review

Confirm that:

- exactly three risks, requirements, mappings, and decisions are included;
- each requirement has an objective verification criterion;
- each vulnerability reference supports the related risk;
- the diagram and decisions use the same component names;
- controls appear in the diagram at the correct boundary or component;
- source and exported diagram files are versioned.

---

# Etapa 3 - Divisão de Tarefas de Arquitetura Segura

## Objetivo Compartilhado

Transformar três riscos altos ou críticos em requisitos verificáveis, referências de vulnerabilidade, controles arquiteturais e decisões justificadas.

## Mínimo Entregável

- três requisitos de segurança;
- três mapeamentos CWE ou OWASP;
- um diagrama de arquitetura segura, com fonte e imagem;
- três decisões de arquitetura justificadas.

## Divisão por Integrante

| Integrante | Tarefa mínima | Entrega |
| --- | --- | --- |
| Iuri | Escolher um risco de identidade e escrever SR01 com critério de verificação e referência CWE/OWASP. | SR01 e mapeamento 1 |
| Sidnei | Escolher um risco de autenticação ou autorização e escrever SR02 com critério e referência. | SR02 e mapeamento 2 |
| Lara | Escolher um risco de acomodação ou operação e escrever SR03 com critério e referência. | SR03 e mapeamento 3 |
| Dyonathan | Criar o diagrama e posicionar os três controles nos componentes ou limites corretos. | Fonte e imagem do diagrama |
| Rafaela | Escrever AD01, AD02 e AD03 e integrar riscos, requisitos, referências, controles e componentes. | Três decisões e documento final |

## Conteúdo Mínimo do Diagrama

- usuários e papéis internos;
- interface ou cliente;
- autenticação e autorização no servidor;
- aplicação ou API;
- banco de dados;
- logs ou monitoramento;
- serviços externos relevantes;
- limites de confiança e controles escolhidos.

## Revisão Final

- conferir os três riscos, requisitos, mapeamentos e decisões;
- conferir critérios objetivos de verificação;
- conferir coerência entre referências, controles e riscos;
- conferir nomes dos componentes no texto e no diagrama;
- versionar fonte e imagem exportada.
