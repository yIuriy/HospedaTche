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

# Etapa 2 - Divisão de Tarefas de Análise e Tratamento de Riscos

Este documento define a divisão da Etapa 2 do HospedaTche. Cada integrante continua responsável pela mesma área em que trabalhou na Etapa 1.

A Etapa 2 não substitui ameaças STRIDE nem casos de abuso. Cada integrante deve usar os artefatos da Etapa 1 como entrada e criar a análise de risco no arquivo correspondente em `artifacts/risk-treatment/<modulo>/risk-register.md`.

## Objetivo Compartilhado

Transformar a análise de segurança da Etapa 1 em um plano de tratamento de riscos usando o NIST Cybersecurity Framework 2.0.

Cada módulo deve conectar:

```text
ameaça STRIDE -> caso de abuso -> risco -> prioridade -> estratégia de tratamento -> função NIST -> controle -> verificação -> risco residual
```

## Regras Compartilhadas

- Manter documentação do repositório em inglês.
- Manter cada integrante no mesmo módulo em que trabalhou antes.
- Não implementar controles na Etapa 2.
- Não apagar nem substituir ameaças ou casos de abuso da Etapa 1.
- Cada ameaça relevante da Etapa 1 deve gerar pelo menos um risco.
- Uma ameaça pode gerar mais de um risco se puder causar consequências diferentes.
- Controles propostos devem ser concretos e verificáveis.
- Evitar controles genéricos como "melhorar segurança", "usar criptografia" ou "monitorar o sistema" sem explicar onde, como, por que, responsável e forma de verificação.

## Entrega Esperada por Módulo

Cada integrante deve atualizar apenas o arquivo do seu módulo:

```text
artifacts/risk-treatment/<modulo>/risk-register.md
```

Cada arquivo deve conter:

- registro de riscos;
- valores de probabilidade e impacto;
- cálculo da pontuação;
- nível do risco;
- justificativas da avaliação;
- priorização;
- mapeamento NIST CSF 2.0;
- plano de tratamento;
- controles propostos;
- responsáveis;
- evidências e verificação;
- ordem inicial de implementação;
- risco residual esperado.

## Modelo de Pontuação

Pontuação:

```text
Probabilidade x Impacto
```

Níveis:

| Pontuação | Nível |
| --- | --- |
| 1 a 3 | Baixo |
| 4 a 7 | Médio |
| 8 a 11 | Alto |
| 12 a 16 | Crítico |

## Funções NIST CSF 2.0

Usar apenas as funções relevantes para o risco. Não marcar todas automaticamente.

| Função | Significado no projeto |
| --- | --- |
| Govern | Políticas, responsáveis, prioridades, regras de aprovação e critérios de aceitação. |
| Identify | Ativos, dependências, vulnerabilidades e condições de risco. |
| Protect | Salvaguardas que reduzem probabilidade ou impacto. |
| Detect | Identificação de atividade suspeita, falhas, abuso ou sinais de incidente. |
| Respond | Contenção, análise, comunicação e tratamento de incidentes. |
| Recover | Restauração de serviço, dados ou estado operacional após incidente. |

Exemplo:

```text
Protect é uma função NIST.
Exigir MFA para contas internas é um controle.
Testes de autenticação e logs de auditoria são evidências de verificação.
```

## Divisão por Integrante

| Integrante | Nome | Módulo da Etapa 1 | Arquivo da Etapa 2 |
| :--- | :--- | :--- | :--- |
| Membro 1 | Iuri | Cadastro e Identidade | `artifacts/risk-treatment/accounts/risk-register.md` |
| Membro 2 | Sidnei | Autenticação e Controle de Acesso | `artifacts/risk-treatment/accounts/risk-register.md` |
| Membro 3 | Lara | Acomodações e Quartos | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Membro 4 | Dyonathan | Reservas e Pagamentos | `artifacts/risk-treatment/booking/risk-register.md` e `artifacts/risk-treatment/payment/risk-register.md` |
| Membro 5 | Rafaela | Busca, Avaliações e Mensagens | `artifacts/risk-treatment/search-messaging/risk-register.md` |

Iuri e Sidnei continuam na área de contas, mas com focos diferentes. Eles devem combinar os IDs de risco dentro do mesmo arquivo `accounts/risk-register.md`.

## Iuri

Pasta:

```text
artifacts/risk-treatment/accounts/
```

Foco:

- cadastro de hóspede;
- validação de identidade;
- abuso de CPF/email;
- contas falsas;
- roubo de conta;
- exposição de dados de perfil;
- recuperação de senha quando ligada à identidade.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaça STRIDE | T02 - Account Takeover |
| Caso de abuso | AC02 - Account Takeover |
| Evento de risco | Atacante acessa conta de hóspede e age como a vítima. |
| Vulnerabilidade ou condição | Proteção fraca de login, reutilização de credenciais, ausência de detecção de login suspeito. |
| Probabilidade | 3 |
| Impacto | 4 |
| Pontuação | 12 |
| Nível | Crítico |
| Estratégia | Reduzir |
| Funções NIST | Govern, Protect, Detect, Respond, Recover |
| Controles | MFA em ações sensíveis, limite de tentativas, alerta de login suspeito, revogação de sessão. |
| Evidências | Testes de autenticação, logs, simulação de alerta, teste de invalidação de sessão. |
| Risco residual | Médio, aceito somente com monitoramento e resposta a incidente. |

## Sidnei

Pasta:

```text
artifacts/risk-treatment/accounts/
```

Foco:

- autenticação;
- sessões;
- autorização por papel;
- rotas protegidas;
- hierarquia interna;
- escalonamento de privilégio;
- abuso de conta administrativa.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R02 |
| Ameaça STRIDE | T20 - Broken Route Authorization |
| Caso de abuso | AC04 - Broken Route Authorization |
| Evento de risco | Hóspede acessa endpoint interno reservado a funcionários. |
| Vulnerabilidade ou condição | Back-end depende apenas de ocultação de rotas no front-end. |
| Probabilidade | 3 |
| Impacto | 4 |
| Pontuação | 12 |
| Nível | Crítico |
| Estratégia | Reduzir |
| Funções NIST | Govern, Protect, Detect, Respond |
| Controles | RBAC no servidor, testes por papel, política deny-by-default, log de acesso negado. |
| Evidências | Testes automatizados de autorização, matriz de acesso, logs de bloqueio. |
| Risco residual | Médio, aceito se todo endpoint protegido tiver autorização testada. |

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
- manutenção;
- check-in/check-out;
- acompanhantes.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaça STRIDE | T01 - Room Availability Manipulation |
| Caso de abuso | AC01 - Room Availability Manipulation |
| Evento de risco | Atacante ou funcionário malicioso altera disponibilidade e bloqueia reservas legítimas. |
| Vulnerabilidade ou condição | Autorização fraca ou ausência de auditoria em alterações de disponibilidade. |
| Probabilidade | 3 |
| Impacto | 3 |
| Pontuação | 9 |
| Nível | Alto |
| Estratégia | Reduzir |
| Funções NIST | Govern, Protect, Detect, Respond, Recover |
| Controles | Permissão por papel, log de auditoria, aprovação gerencial para alterações em massa, restauração de estado anterior. |
| Evidências | Testes de permissão, registros de auditoria, registros de aprovação, simulação de recuperação. |
| Risco residual | Médio, aceito se as alterações forem rastreáveis e reversíveis. |

## Dyonathan

Pastas:

```text
artifacts/risk-treatment/booking/
artifacts/risk-treatment/payment/
```

Foco:

- criação de reserva;
- cancelamento;
- confirmação;
- expiração;
- transições de estado;
- status de pagamento;
- respostas do gateway;
- reembolsos;
- auditoria de pagamento.

Exemplo de risco de reserva:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaça STRIDE | T15 - Booking State Machine Transition Bypass |
| Caso de abuso | AC12 - Booking State Machine Transition Bypass |
| Evento de risco | Hóspede forca transição inválida e reativa reserva expirada. |
| Vulnerabilidade ou condição | Transições de estado não são validadas no servidor. |
| Probabilidade | 2 |
| Impacto | 4 |
| Pontuação | 8 |
| Nível | Alto |
| Estratégia | Reduzir |
| Funções NIST | Govern, Protect, Detect, Recover |
| Controles | Validação de máquina de estados, log de transições, alerta de transição rejeitada, procedimento de rollback. |
| Evidências | Testes de transição, logs, simulação de alerta, teste de rollback. |
| Risco residual | Médio, aceito se transições inválidas forem bloqueadas e registradas. |

Exemplo de risco de pagamento:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaça STRIDE | T02 - Payment Gateway Token Tampering |
| Caso de abuso | AC10 - Payment Gateway Token Tampering |
| Evento de risco | Atacante altera resposta do gateway e marca reserva não paga como paga. |
| Vulnerabilidade ou condição | Callback de pagamento não valida assinatura ou token confiável do provedor. |
| Probabilidade | 2 |
| Impacto | 4 |
| Pontuação | 8 |
| Nível | Alto |
| Estratégia | Reduzir |
| Funções NIST | Protect, Detect, Respond, Recover |
| Controles | Validação de webhook assinado, reconciliação de referência de pagamento, alerta de status suspeito, fluxo de correção manual. |
| Evidências | Testes de webhook, relatório de reconciliação, log de alerta, registro de correção. |
| Risco residual | Médio, aceito somente após verificação com provedor e reconciliação. |

## Rafaela

Pasta:

```text
artifacts/risk-treatment/search-messaging/
```

Foco:

- busca de quartos;
- informações públicas;
- enumeração de quartos ocultos;
- avaliações;
- notas;
- notificações;
- chat;
- histórico de mensagens.

Exemplo de risco:

| Campo | Exemplo |
| --- | --- |
| ID | R01 |
| Ameaça STRIDE | T02 - Chat Message Flooding |
| Caso de abuso | AC02 - Chat Message Flooding |
| Evento de risco | Atacante sobrecarrega chat e impede atendimento legítimo. |
| Vulnerabilidade ou condição | Ausência de limite de mensagens, detecção de abuso e proteção da fila da recepção. |
| Probabilidade | 3 |
| Impacto | 3 |
| Pontuação | 9 |
| Nível | Alto |
| Estratégia | Reduzir |
| Funções NIST | Protect, Detect, Respond |
| Controles | Limite de mensagens, controle de fila, alerta de abuso, restrição temporária de chat. |
| Evidências | Testes de limite, logs de alerta, simulação de carga, registro de revisão de bloqueio. |
| Risco residual | Médio, aceito se o atendimento legítimo continuar disponível durante tentativas de abuso. |

## Revisão Final Compartilhada

Depois que todos terminarem seus arquivos, o grupo deve revisar:

- IDs duplicados dentro do mesmo módulo;
- notas incoerentes de probabilidade ou impacto;
- erro de cálculo da pontuação;
- risco marcado com todas as funções NIST sem justificativa;
- controle genérico sem evidência;
- risco aceito sem condição de aprovação;
- risco residual dizendo que reduziu sem implementação;
- falta de ligação com ameaças ou casos de abuso da Etapa 1.

## Validação

Rodar quando arquivos de tratamento de risco forem alterados:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```

O hook de pre-commit do repositório também roda essa verificação junto com as outras validações.
