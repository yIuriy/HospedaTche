# Stage 2 - Risk Analysis and Treatment Task Division

This document defines the Stage 2 work division for HospedaTche. It keeps each member responsible for the same system area used in Stage 1.

Stage 2 does not replace STRIDE threats or abuse cases. Each member must use their existing Stage 1 artifacts as input and create risk analysis and treatment content in the matching `artifacts/risk-treatment/<module>/risk-register.md` file.

## Shared Goal

Transform Stage 1 security analysis into a risk treatment plan using NIST Cybersecurity Framework 2.0.

Each module must connect:

```text
STRIDE threat -> abuse case -> risk -> priority -> treatment strategy -> NIST function -> control -> verification -> residual risk
```

## Shared Rules

- Keep documentation in English.
- Keep each member in the same module they worked on before.
- Do not implement controls in Stage 2.
- Do not delete or rewrite Stage 1 threats or abuse cases.
- Every relevant Stage 1 threat should generate at least one risk.
- One threat may generate more than one risk if it can cause different consequences.
- Proposed controls must be concrete and observable.
- Avoid generic controls like "improve security", "use encryption", or "monitor the system" without explaining where, how, why, owner, and verification.

## Required Output Per Module

Each member must update only their module file:

```text
artifacts/risk-treatment/<module>/risk-register.md
```

Each module file must contain:

- risk register;
- probability and impact values;
- score calculation;
- risk level;
- evaluation justifications;
- prioritization;
- NIST CSF 2.0 mapping;
- treatment plan;
- proposed controls;
- responsible parties;
- evidence and verification;
- initial implementation order;
- expected residual risk.

## Scoring Model

Risk score:

```text
Probability x Impact
```

Risk levels:

| Score | Level |
| --- | --- |
| 1 to 3 | Low |
| 4 to 7 | Medium |
| 8 to 11 | High |
| 12 to 16 | Critical |

Probability values:

| Value | Meaning |
| --- | --- |
| 1 | Low |
| 2 | Medium-low |
| 3 | Medium-high |
| 4 | High |

Impact values:

| Value | Meaning |
| --- | --- |
| 1 | Low |
| 2 | Moderate |
| 3 | High |
| 4 | Very high |

## NIST CSF 2.0 Functions

Use only the functions that are relevant to the risk. Do not mark all functions automatically.

| Function | Meaning in this project |
| --- | --- |
| Govern | Define policies, owners, priorities, approval rules, and risk acceptance criteria. |
| Identify | Understand affected assets, dependencies, vulnerabilities, and risk conditions. |
| Protect | Add safeguards to reduce likelihood or impact. |
| Detect | Identify suspicious activity, failures, abuse, or incident signals. |
| Respond | Contain, analyze, communicate, and handle incidents. |
| Recover | Restore service, data, or operational state after an incident. |

Example:

```text
Protect is a NIST function.
Require MFA for staff accounts is a control.
Authentication test results and login audit logs are verification evidence.
```

## Member Assignment

| Member | Name | Stage 1 Module | Stage 2 File |
| :--- | :--- | :--- | :--- |
| Member 1 | Iuri | User Registration & Identity | `artifacts/risk-treatment/accounts/risk-register.md` |
| Member 2 | Sidnei | Authentication & Access Control | `artifacts/risk-treatment/accounts/risk-register.md` |
| Member 3 | Lara | Accommodation & Listing Management | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Member 4 | Dyonathan | Booking & Payment Transactions | `artifacts/risk-treatment/booking/risk-register.md` and `artifacts/risk-treatment/payment/risk-register.md` |
| Member 5 | Rafaela | Search, Reviews & Messaging | `artifacts/risk-treatment/search-messaging/risk-register.md` |

Member 1 and Member 2 both worked in the accounts area, but with different focus. They should coordinate IDs inside the same accounts risk register.

## Member 1 - Iuri

Assigned folder:

```text
artifacts/risk-treatment/accounts/
```

Main focus:

- guest registration;
- identity validation;
- CPF/email misuse;
- fake guest accounts;
- account takeover;
- guest profile data exposure;
- password recovery risks, if related to identity.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/accounts/T01-fake-guest-registration.md`
- `artifacts/threat-modeling/accounts/T02-account-takeover.md`
- `artifacts/threat-modeling/accounts/T03-unverified-guest-identity-abuse.md`
- `artifacts/threat-modeling/accounts/T11-password-reset-token-leakage.md`
- `artifacts/threat-modeling/accounts/T18-guest-cpf-enumeration.md`
- `artifacts/abuse-cases/accounts/AC01-fake-guest-registration.md`
- `artifacts/abuse-cases/accounts/AC02-account-takeover.md`
- `artifacts/abuse-cases/accounts/AC11-password-reset-token-leakage.md`
- `artifacts/abuse-cases/accounts/AC18-guest-cpf-enumeration.md`

Expected work:

- Create risks about fake identity, stolen accounts, exposed CPF/email data, and recovery-token misuse.
- Justify probability based on how easy it is to create accounts, reuse leaked credentials, enumerate CPF/email, or abuse recovery flows.
- Justify impact based on privacy harm, fraudulent bookings, user lockout, and identity misuse.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T02 - Account Takeover |
| Related Abuse Case | AC02 - Account Takeover |
| Risk Event | Attacker accesses a guest account and performs actions as the victim. |
| Vulnerability or Condition | Weak login protection, credential reuse, missing suspicious-login detection. |
| Probability | 3 |
| Impact | 4 |
| Score | 12 |
| Level | Critical |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond, Recover |
| Controls | MFA for sensitive actions, login rate limits, suspicious-login alerts, session revocation. |
| Evidence | Authentication tests, audit logs, alert simulation, session invalidation test. |
| Residual Risk | Medium, accepted only with monitoring and incident response. |

## Member 2 - Sidnei

Assigned folder:

```text
artifacts/risk-treatment/accounts/
```

Main focus:

- authentication;
- sessions;
- role authorization;
- protected routes;
- staff hierarchy;
- privilege escalation;
- administrative account abuse.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/accounts/T19-unauthorized-role-elevation.md`
- `artifacts/threat-modeling/accounts/T20-broken-route-authorization.md`
- `artifacts/threat-modeling/accounts/T21-session-fixation-and-hijacking.md`
- `artifacts/threat-modeling/accounts/T22-secondary-administrator-account-creation.md`
- `artifacts/threat-modeling/accounts/T23-internal-staff-hierarchy-bypass.md`
- `artifacts/abuse-cases/accounts/AC03-unauthorized-role-elevation.md`
- `artifacts/abuse-cases/accounts/AC04-broken-route-authorization.md`
- `artifacts/abuse-cases/accounts/AC19-session-fixation-and-hijacking.md`
- `artifacts/abuse-cases/accounts/AC20-secondary-administrator-account-creation.md`
- `artifacts/abuse-cases/accounts/AC21-internal-staff-hierarchy-bypass.md`

Expected work:

- Create risks about users accessing forbidden routes, gaining roles, abusing sessions, or bypassing staff hierarchy.
- Coordinate risk IDs with Iuri because both write to `accounts/risk-register.md`.
- Prioritize risks that can lead to administrator compromise or staff lockout.

Example risk:

| Field | Example |
| --- | --- |
| ID | R02 |
| Related STRIDE Threat | T20 - Broken Route Authorization |
| Related Abuse Case | AC04 - Broken Route Authorization |
| Risk Event | Guest directly accesses internal staff endpoints. |
| Vulnerability or Condition | Back-end depends on front-end route hiding instead of server-side authorization checks. |
| Probability | 3 |
| Impact | 4 |
| Score | 12 |
| Level | Critical |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond |
| Controls | Server-side RBAC checks, authorization tests per role, deny-by-default route policy, audit log for denied access. |
| Evidence | Automated authorization tests, route access matrix, denied-access logs. |
| Residual Risk | Medium, accepted only if every protected endpoint has tested authorization. |

## Member 3 - Lara

Assigned folder:

```text
artifacts/risk-treatment/accommodation/
```

Main focus:

- room availability;
- room status;
- room rates;
- capacity;
- cleaning queue;
- maintenance notes;
- check-in/check-out operational data;
- companion registration.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/accommodation/`
- `artifacts/abuse-cases/accommodation/`

Expected work:

- Create risks about room manipulation, false availability, wrong status, incorrect rates, maintenance disruption, and occupancy inconsistency.
- Prioritize risks that affect booking correctness, guest safety, room turnover, or revenue.
- Include operational verification, not only technical controls.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T01 - Room Availability Manipulation |
| Related Abuse Case | AC01 - Room Availability Manipulation |
| Risk Event | Attacker or malicious staff changes room availability and blocks legitimate bookings. |
| Vulnerability or Condition | Weak authorization or missing audit for room availability changes. |
| Probability | 3 |
| Impact | 3 |
| Score | 9 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Respond, Recover |
| Controls | Role-based permission for availability updates, audit log, manager approval for bulk changes, restore previous availability state. |
| Evidence | Permission tests, audit records, approval records, recovery simulation. |
| Residual Risk | Medium, accepted if changes are traceable and reversible. |

## Member 4 - Dyonathan

Assigned folders:

```text
artifacts/risk-treatment/booking/
artifacts/risk-treatment/payment/
```

Main focus:

- booking creation;
- booking cancellation;
- booking confirmation;
- expiration;
- booking state transitions;
- payment status;
- payment gateway responses;
- refunds;
- payment audit records.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/booking/`
- `artifacts/threat-modeling/payments/`
- `artifacts/abuse-cases/booking/`
- `artifacts/abuse-cases/payment/`

Expected work:

- Split booking risks into `booking/risk-register.md`.
- Split payment and refund risks into `payment/risk-register.md`.
- Prioritize risks that can confirm unpaid reservations, cause financial loss, duplicate refunds, or corrupt reservation state.
- Use NIST `Recover` when restoration of booking/payment state matters.

Example booking risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T15 - Booking State Machine Transition Bypass |
| Related Abuse Case | AC12 - Booking State Machine Transition Bypass |
| Risk Event | Guest forces an invalid booking transition and reactivates an expired booking. |
| Vulnerability or Condition | State transitions are not enforced centrally by server-side rules. |
| Probability | 2 |
| Impact | 4 |
| Score | 8 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Govern, Protect, Detect, Recover |
| Controls | Server-side state machine validation, transition audit log, rejected-transition alerts, rollback procedure. |
| Evidence | State-transition tests, audit entries, alert simulation, rollback test. |
| Residual Risk | Medium, accepted if invalid transitions are blocked and logged. |

Example payment risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T02 - Payment Gateway Token Tampering |
| Related Abuse Case | AC10 - Payment Gateway Token Tampering |
| Risk Event | Attacker tampers with payment gateway response data and marks unpaid booking as paid. |
| Vulnerability or Condition | Payment callback is not validated with trusted provider signature or token verification. |
| Probability | 2 |
| Impact | 4 |
| Score | 8 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Protect, Detect, Respond, Recover |
| Controls | Signed webhook validation, payment reference reconciliation, suspicious payment-status alert, manual correction workflow. |
| Evidence | Webhook validation tests, reconciliation report, alert log, correction record. |
| Residual Risk | Medium, accepted only after provider verification and reconciliation exist. |

## Member 5 - Rafaela

Assigned folder:

```text
artifacts/risk-treatment/search-messaging/
```

Main focus:

- room search;
- public room information;
- hidden room enumeration;
- reviews;
- ratings;
- notifications;
- chat;
- message logs.

Suggested Stage 1 sources:

- `artifacts/threat-modeling/search-messaging/`
- `artifacts/abuse-cases/search-messaging/`

Expected work:

- Create risks about search overload, hidden information exposure, chat flooding, staff spoofing, review manipulation, notification abuse, and message history tampering.
- Prioritize risks that affect service availability, privacy, staff trust, or reputation.
- Use `Detect` for abuse signals such as flood patterns, abnormal review volume, and suspicious message routing.

Example risk:

| Field | Example |
| --- | --- |
| ID | R01 |
| Related STRIDE Threat | T02 - Chat Message Flooding |
| Related Abuse Case | AC02 - Chat Message Flooding |
| Risk Event | Attacker floods the guest-reception chat and prevents staff from handling legitimate requests. |
| Vulnerability or Condition | Missing rate limits, abuse detection, and staff queue protection. |
| Probability | 3 |
| Impact | 3 |
| Score | 9 |
| Level | High |
| Treatment Strategy | Reduce |
| NIST Functions | Protect, Detect, Respond |
| Controls | Message rate limiting, queue throttling, abuse alerts, temporary chat restriction policy. |
| Evidence | Rate-limit tests, alert logs, queue-load simulation, restriction review record. |
| Residual Risk | Medium, accepted if legitimate support remains available during abuse attempts. |

## Shared Final Review

After all members finish their module files, the group should review:

- duplicated risk IDs inside the same module;
- inconsistent probability or impact scoring;
- risks with score errors;
- risks marked with every NIST function without justification;
- generic controls without verification evidence;
- accepted risks without approval condition;
- residual risk that claims reduction without implemented controls;
- missing links to Stage 1 threats or abuse cases.

## Validation

Run the Stage 2 validator when risk-treatment files change:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```

The repository pre-commit hook also runs this check with the other validations.

## Commit Message Examples

- `Add identity risk treatment entries`
- `Add access control risk prioritization`
- `Add accommodation risk treatment plan`
- `Add booking and payment risk treatment`
- `Add search messaging NIST risk mapping`

---

# Etapa 2 - Divisao de Tarefas de Analise e Tratamento de Riscos

Este documento define a divisao da Etapa 2 do HospedaTche. Cada integrante continua responsavel pela mesma area em que trabalhou na Etapa 1.

A Etapa 2 nao substitui ameacas STRIDE nem casos de abuso. Cada integrante deve usar os artefatos da Etapa 1 como entrada e criar a analise de risco no arquivo correspondente em `artifacts/risk-treatment/<modulo>/risk-register.md`.

## Objetivo Compartilhado

Transformar a analise de seguranca da Etapa 1 em um plano de tratamento de riscos usando o NIST Cybersecurity Framework 2.0.

Cada modulo deve conectar:

```text
ameaca STRIDE -> caso de abuso -> risco -> prioridade -> estrategia de tratamento -> funcao NIST -> controle -> verificacao -> risco residual
```

## Regras Compartilhadas

- Manter documentacao do repositorio em ingles.
- Manter cada integrante no mesmo modulo em que trabalhou antes.
- Nao implementar controles na Etapa 2.
- Nao apagar nem substituir ameaças ou casos de abuso da Etapa 1.
- Cada ameaca relevante da Etapa 1 deve gerar pelo menos um risco.
- Uma ameaca pode gerar mais de um risco se puder causar consequencias diferentes.
- Controles propostos devem ser concretos e verificaveis.
- Evitar controles genericos como "melhorar seguranca", "usar criptografia" ou "monitorar o sistema" sem explicar onde, como, por que, responsavel e forma de verificacao.

## Entrega Esperada por Modulo

Cada integrante deve atualizar apenas o arquivo do seu modulo:

```text
artifacts/risk-treatment/<modulo>/risk-register.md
```

Cada arquivo deve conter:

- registro de riscos;
- valores de probabilidade e impacto;
- calculo da pontuacao;
- nivel do risco;
- justificativas da avaliacao;
- priorizacao;
- mapeamento NIST CSF 2.0;
- plano de tratamento;
- controles propostos;
- responsaveis;
- evidencias e verificacao;
- ordem inicial de implementacao;
- risco residual esperado.

## Modelo de Pontuacao

Pontuacao:

```text
Probabilidade x Impacto
```

Niveis:

| Pontuacao | Nivel |
| --- | --- |
| 1 a 3 | Baixo |
| 4 a 7 | Medio |
| 8 a 11 | Alto |
| 12 a 16 | Critico |

## Funcoes NIST CSF 2.0

Usar apenas as funcoes relevantes para o risco. Nao marcar todas automaticamente.

| Funcao | Significado no projeto |
| --- | --- |
| Govern | Politicas, responsaveis, prioridades, regras de aprovacao e criterios de aceitacao. |
| Identify | Ativos, dependencias, vulnerabilidades e condicoes de risco. |
| Protect | Salvaguardas que reduzem probabilidade ou impacto. |
| Detect | Identificacao de atividade suspeita, falhas, abuso ou sinais de incidente. |
| Respond | Contencao, analise, comunicacao e tratamento de incidentes. |
| Recover | Restauracao de servico, dados ou estado operacional apos incidente. |

Exemplo:

```text
Protect e uma funcao NIST.
Exigir MFA para contas internas e um controle.
Testes de autenticacao e logs de auditoria sao evidencias de verificacao.
```

## Divisao por Integrante

| Integrante | Nome | Modulo da Etapa 1 | Arquivo da Etapa 2 |
| :--- | :--- | :--- | :--- |
| Membro 1 | Iuri | Cadastro e Identidade | `artifacts/risk-treatment/accounts/risk-register.md` |
| Membro 2 | Sidnei | Autenticacao e Controle de Acesso | `artifacts/risk-treatment/accounts/risk-register.md` |
| Membro 3 | Lara | Acomodacoes e Quartos | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Membro 4 | Dyonathan | Reservas e Pagamentos | `artifacts/risk-treatment/booking/risk-register.md` e `artifacts/risk-treatment/payment/risk-register.md` |
| Membro 5 | Rafaela | Busca, Avaliacoes e Mensagens | `artifacts/risk-treatment/search-messaging/risk-register.md` |

Iuri e Sidnei continuam na area de contas, mas com focos diferentes. Eles devem combinar os IDs de risco dentro do mesmo arquivo `accounts/risk-register.md`.

## Iuri

Pasta:

```text
artifacts/risk-treatment/accounts/
```

Foco:

- cadastro de hospede;
- validacao de identidade;
- abuso de CPF/email;
- contas falsas;
- roubo de conta;
- exposicao de dados de perfil;
- recuperacao de senha quando ligada a identidade.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaca STRIDE | T02 - Account Takeover |
| Caso de abuso | AC02 - Account Takeover |
| Evento de risco | Atacante acessa conta de hospede e age como a vitima. |
| Vulnerabilidade ou condicao | Protecao fraca de login, reutilizacao de credenciais, ausencia de deteccao de login suspeito. |
| Probabilidade | 3 |
| Impacto | 4 |
| Pontuacao | 12 |
| Nivel | Critico |
| Estrategia | Reduzir |
| Funcoes NIST | Govern, Protect, Detect, Respond, Recover |
| Controles | MFA em acoes sensiveis, limite de tentativas, alerta de login suspeito, revogacao de sessao. |
| Evidencias | Testes de autenticacao, logs, simulacao de alerta, teste de invalidacao de sessao. |
| Risco residual | Medio, aceito somente com monitoramento e resposta a incidente. |

## Sidnei

Pasta:

```text
artifacts/risk-treatment/accounts/
```

Foco:

- autenticacao;
- sessoes;
- autorizacao por papel;
- rotas protegidas;
- hierarquia interna;
- escalonamento de privilegio;
- abuso de conta administrativa.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R02 |
| Ameaca STRIDE | T20 - Broken Route Authorization |
| Caso de abuso | AC04 - Broken Route Authorization |
| Evento de risco | Hospede acessa endpoint interno reservado a funcionarios. |
| Vulnerabilidade ou condicao | Back-end depende apenas de ocultacao de rotas no front-end. |
| Probabilidade | 3 |
| Impacto | 4 |
| Pontuacao | 12 |
| Nivel | Critico |
| Estrategia | Reduzir |
| Funcoes NIST | Govern, Protect, Detect, Respond |
| Controles | RBAC no servidor, testes por papel, politica deny-by-default, log de acesso negado. |
| Evidencias | Testes automatizados de autorizacao, matriz de acesso, logs de bloqueio. |
| Risco residual | Medio, aceito se todo endpoint protegido tiver autorizacao testada. |

## Lara

Pasta:

```text
artifacts/risk-treatment/accommodation/
```

Foco:

- disponibilidade de quartos;
- status de quarto;
- tarifas;
- capacidade;
- fila de limpeza;
- manutencao;
- check-in/check-out;
- acompanhantes.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaca STRIDE | T01 - Room Availability Manipulation |
| Caso de abuso | AC01 - Room Availability Manipulation |
| Evento de risco | Atacante ou funcionario malicioso altera disponibilidade e bloqueia reservas legitimas. |
| Vulnerabilidade ou condicao | Autorizacao fraca ou ausencia de auditoria em alteracoes de disponibilidade. |
| Probabilidade | 3 |
| Impacto | 3 |
| Pontuacao | 9 |
| Nivel | Alto |
| Estrategia | Reduzir |
| Funcoes NIST | Govern, Protect, Detect, Respond, Recover |
| Controles | Permissao por papel, log de auditoria, aprovacao gerencial para alteracoes em massa, restauracao de estado anterior. |
| Evidencias | Testes de permissao, registros de auditoria, registros de aprovacao, simulacao de recuperacao. |
| Risco residual | Medio, aceito se as alteracoes forem rastreaveis e reversiveis. |

## Dyonathan

Pastas:

```text
artifacts/risk-treatment/booking/
artifacts/risk-treatment/payment/
```

Foco:

- criacao de reserva;
- cancelamento;
- confirmacao;
- expiracao;
- transicoes de estado;
- status de pagamento;
- respostas do gateway;
- reembolsos;
- auditoria de pagamento.

Exemplo de risco de reserva:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaca STRIDE | T15 - Booking State Machine Transition Bypass |
| Caso de abuso | AC12 - Booking State Machine Transition Bypass |
| Evento de risco | Hospede forca transicao invalida e reativa reserva expirada. |
| Vulnerabilidade ou condicao | Transicoes de estado nao sao validadas no servidor. |
| Probabilidade | 2 |
| Impacto | 4 |
| Pontuacao | 8 |
| Nivel | Alto |
| Estrategia | Reduzir |
| Funcoes NIST | Govern, Protect, Detect, Recover |
| Controles | Validacao de maquina de estados, log de transicoes, alerta de transicao rejeitada, procedimento de rollback. |
| Evidencias | Testes de transicao, logs, simulacao de alerta, teste de rollback. |
| Risco residual | Medio, aceito se transicoes invalidas forem bloqueadas e registradas. |

Exemplo de risco de pagamento:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaca STRIDE | T02 - Payment Gateway Token Tampering |
| Caso de abuso | AC10 - Payment Gateway Token Tampering |
| Evento de risco | Atacante altera resposta do gateway e marca reserva nao paga como paga. |
| Vulnerabilidade ou condicao | Callback de pagamento nao valida assinatura ou token confiavel do provedor. |
| Probabilidade | 2 |
| Impacto | 4 |
| Pontuacao | 8 |
| Nivel | Alto |
| Estrategia | Reduzir |
| Funcoes NIST | Protect, Detect, Respond, Recover |
| Controles | Validacao de webhook assinado, reconciliacao de referencia de pagamento, alerta de status suspeito, fluxo de correcao manual. |
| Evidencias | Testes de webhook, relatorio de reconciliacao, log de alerta, registro de correcao. |
| Risco residual | Medio, aceito somente apos verificacao com provedor e reconciliacao. |

## Rafaela

Pasta:

```text
artifacts/risk-treatment/search-messaging/
```

Foco:

- busca de quartos;
- informacoes publicas;
- enumeracao de quartos ocultos;
- avaliacoes;
- notas;
- notificacoes;
- chat;
- historico de mensagens.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaca STRIDE | T02 - Chat Message Flooding |
| Caso de abuso | AC02 - Chat Message Flooding |
| Evento de risco | Atacante sobrecarrega chat e impede atendimento legitimo. |
| Vulnerabilidade ou condicao | Ausencia de limite de mensagens, deteccao de abuso e protecao da fila da recepcao. |
| Probabilidade | 3 |
| Impacto | 3 |
| Pontuacao | 9 |
| Nivel | Alto |
| Estrategia | Reduzir |
| Funcoes NIST | Protect, Detect, Respond |
| Controles | Limite de mensagens, controle de fila, alerta de abuso, restricao temporaria de chat. |
| Evidencias | Testes de limite, logs de alerta, simulacao de carga, registro de revisao de bloqueio. |
| Risco residual | Medio, aceito se o atendimento legitimo continuar disponivel durante tentativas de abuso. |

## Revisao Final Compartilhada

Depois que todos terminarem seus arquivos, o grupo deve revisar:

- IDs duplicados dentro do mesmo modulo;
- notas incoerentes de probabilidade ou impacto;
- erro de calculo da pontuacao;
- risco marcado com todas as funcoes NIST sem justificativa;
- controle generico sem evidencia;
- risco aceito sem condicao de aprovacao;
- risco residual dizendo que reduziu sem implementacao;
- falta de ligacao com ameacas ou casos de abuso da Etapa 1.

## Validacao

Rodar quando arquivos de tratamento de risco forem alterados:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```

O hook de pre-commit do repositorio tambem roda essa verificacao junto com as outras validacoes.
