# Stage 6 - Monitoring and Intrusion Detection Task Division

This document defines the minimum Stage 6 work division. Stage 6 describes how HospedaTche should detect suspicious behavior after deployment.

## Shared Goal

Connect known risks and abuse cases to observable events, simple detection rules, and initial responses.

```text
risk or abuse case -> event and log source -> alert condition -> initial response
```

Installing or implementing an intrusion detection system is not required.

## Minimum Deliverable

- a brief explanation of intrusion detection;
- the difference between prevention and detection;
- events that HospedaTche should log;
- three detection rules;
- an initial response for each alert.

Required output:

```text
roteiros/etapa-6-deteccao-de-intrusoes.md
```

## Required Rule Structure

| Field | Required Content |
| --- | --- |
| Observed Risk | Related Stage 2 risk or Stage 1 abuse case |
| Data Source | Log, request, error, access record, or business event |
| Alert Condition | Measurable suspicious behavior |
| Initial Response | Immediate containment, validation, or escalation action |

Rules may use simple thresholds. Exact production tuning is not required, but each condition must be understandable and testable.

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Explain intrusion detection and distinguish preventive controls from detective controls using HospedaTche examples. | Introduction and comparison section |
| Sidnei | Define the authentication, authorization, business, payment, error, and audit events that should be logged. Include sensitive-data exclusions. | Events and log-source section |
| Lara | Define Detection Rule 1 with all required fields. | Rule DR01 |
| Dyonathan | Define Detection Rule 2 with all required fields. | Rule DR02 |
| Rafaela | Define Detection Rule 3 and consolidate common response and escalation guidance. | Rule DR03 and response section |

## Suggested Detection Topics

Choose three topics connected to prioritized risks:

- repeated failed logins or credential-stuffing patterns;
- forbidden-route access attempts;
- suspicious role or account-status changes;
- abnormal booking cancellation or refund volume;
- rejected payment callbacks or payment-state inconsistency;
- search or chat flooding;
- bulk room-rate, availability, or review changes.

## Logging Safety

Logs should identify actor, action, target, time, result, source, and correlation identifier when applicable. They must not store passwords, reset tokens, session tokens, complete payment data, or unnecessary personal data.

## Shared Final Review

Confirm that:

- exactly three rules are complete;
- each rule links to an existing risk or abuse case;
- data sources contain the information needed by the alert condition;
- alert conditions are more precise than generic statements such as "suspicious activity";
- responses identify the first action and responsible role;
- proposed logs avoid sensitive-data exposure.

---

# Etapa 6 - Divisão de Tarefas de Monitoramento e Detecção de Intrusões

## Objetivo Compartilhado

Ligar riscos e casos de abuso conhecidos a eventos observáveis, regras simples de detecção e respostas iniciais.

```text
risco ou caso de abuso -> evento e fonte de log -> condição do alerta -> resposta inicial
```

Não é necessário instalar nem implementar um sistema de detecção de intrusões.

## Mínimo Entregável

- explicação breve sobre detecção de intrusões;
- diferença entre prevenção e detecção;
- eventos que o HospedaTche deve registrar;
- três regras de detecção;
- resposta inicial para cada alerta.

## Divisão por Integrante

| Integrante | Tarefa mínima | Entrega |
| --- | --- | --- |
| Iuri | Explicar detecção e diferenciar controles preventivos e detectivos com exemplos do sistema. | Introdução e comparação |
| Sidnei | Definir eventos de autenticação, autorização, negócio, pagamento, erro e auditoria e dados que não podem ser gravados. | Eventos e fontes de log |
| Lara | Definir a Regra DR01 com todos os campos obrigatorios. | DR01 |
| Dyonathan | Definir a Regra DR02 com todos os campos obrigatorios. | DR02 |
| Rafaela | Definir a Regra DR03 e consolidar resposta e escalonamento. | DR03 e seção de resposta |

## Estrutura de Cada Regra

Registrar risco observado, fonte de dados, condição mensurável do alerta e resposta inicial.

## Segurança dos Logs

Registrar ator, ação, alvo, horário, resultado, origem e identificador de correlação quando aplicável. Não registrar senhas, tokens, dados completos de pagamento nem dados pessoais desnecessários.

## Revisão Final

- conferir exatamente três regras;
- conferir ligação com riscos ou casos de abuso existentes;
- conferir se a fonte de dados sustenta a condição;
- usar condições mensuráveis;
- identificar primeira resposta e responsável;
- evitar exposição de dados sensíveis nos logs.
