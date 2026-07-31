# Stage 1 - Group Tasks by System Module

## Group Members

- **Member 1 (User / Lead)**: Iuri - User Registration & Identity Module
- **Member 2**: Sidnei - Authentication & Access Control Module
- **Member 3**: Lara - Accommodation & Listing Management Module
- **Member 4**: Dyonathan - Booking & Payment Transactions Module
- **Member 5**: Rafaela - Search, Reviews & Messaging Module

## Shared Scope

HospedaTche is a hotel accommodation system with four user roles: Administrator, Manager, Receptionist, and Guest.

The system covers guest registration, authentication, room management, availability, booking, online payment, cancellation, check-in, check-out, chat, reviews, reports, audit, and hotel rules.

The system does not manage room consumption, such as drinks, minibar items, snacks, or room service charges.

## Shared References

- Functional requirements: `artifacts/functional-requirements/functional-requirements.md`
- Functional requirements summary: `artifacts/functional-requirements/summary.md`
- Non-functional requirements: `artifacts/non-functional-requirements/non-functional-requirements.md`
- Non-functional requirements summary: `artifacts/non-functional-requirements/summary.md`
- Business rules: `artifacts/business-rules/business-rules.md`
- STRIDE template: `artifacts/templates/stride-threat-template.md`
- Abuse case template: `artifacts/templates/abuse-case-template.md`

## Work Order

1. Create STRIDE threats and abuse cases for the assigned module.
2. Review related RF and NFR links.
3. Add or update business rules only if a real business rule appears.
4. Add diagrams or mitigations only if time remains.
5. Run assigned validation scripts before commit.

## Equal Workload Matrix

| Member | Name | Assigned Module | Main RF/NFR Area | STRIDE Focus | Abuse Cases |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Member 1 | Iuri | User Registration & Identity | RF01-RF10, NFR01, NFR03, NFR04, NFR20 | Spoofing | AC01, AC02 |
| Member 2 | Sidnei | Authentication & Access Control | RF01, RF04-RF09, NFR01-NFR04, NFR07 | Elevation of Privilege | AC03, AC04 |
| Member 3 | Lara | Accommodation & Listing Management | RF14-RF21, RF35-RF40, NFR13 | Tampering | AC05, AC06 |
| Member 4 | Dyonathan | Booking & Payment Transactions | RF22-RF34, NFR06, NFR10, NFR13, NFR14 | Repudiation, Tampering | AC07, AC08 |
| Member 5 | Rafaela | Search, Reviews & Messaging | RF11-RF13, RF18-RF21, RF41-RF47, NFR05, NFR09 | Denial of Service, Information Disclosure | AC09, AC10 |

## Member 1 - Iuri: User Registration & Identity

### Task 1.1 - Create STRIDE Threats

- Create threats for identity registration and guest/internal account data.
- Focus on Spoofing.
- Suggested topics:
  - Fake guest registration with stolen CPF or email.
  - Account takeover using stolen credentials.
  - Unverified guest identity abuse.

### Task 1.2 - Create Abuse Cases

- Create AC01 and AC02.
- Use `artifacts/templates/abuse-case-template.md`.
- Suggested abuse cases:
  - AC01 - Fake Guest Registration.
  - AC02 - Account Takeover.

### Task 1.3 - Review Requirements

- Review RF01-RF10.
- Review NFR01, NFR03, NFR04, NFR20.
- Add business rules only if identity-specific rules appear.

### Task 1.4 - Optional

- Update system overview sections.
- Add simple context diagram if needed.

## Member 2 - Sidnei: Authentication & Access Control

### Task 2.1 - Create STRIDE Threats

- Create threats for login, sessions, route protection, and role authorization.
- Focus on Elevation of Privilege.
- Suggested topics:
  - Guest accesses staff route.
  - Receptionist accesses manager features.
  - Manager accesses administrator features.

### Task 2.2 - Create Abuse Cases

- Create AC03 and AC04.
- Use `artifacts/templates/abuse-case-template.md`.
- Suggested abuse cases:
  - AC03 - Unauthorized Role Elevation.
  - AC04 - Broken Route Authorization.

### Task 2.3 - Review Requirements

- Review RF01, RF04-RF09.
- Review NFR01-NFR04 and NFR07.
- Add business rules only if access-control rules appear.

### Task 2.4 - Optional

- Add simple role/access diagram.

## Member 3 - Lara: Accommodation & Listing Management

### Task 3.1 - Create STRIDE Threats

- Create threats for rooms, room status, availability, rates, cleaning, and maintenance.
- Focus on Tampering.
- Suggested topics:
  - Unauthorized room rate change.
  - Room availability manipulation.
  - Room status changed to hide occupancy or maintenance.

### Task 3.2 - Create Abuse Cases

- Create AC05 and AC06.
- Use `artifacts/templates/abuse-case-template.md`.
- Suggested abuse cases:
  - AC05 - Unauthorized Room Rate Tampering.
  - AC06 - Room Availability Manipulation.

### Task 3.3 - Review Requirements

- Review RF14-RF21 and RF35-RF40.
- Review NFR13.
- Add business rules only if hotel room operation rules appear.

### Task 3.4 - Optional

- Add simple DFD for room status, availability, and booking interaction.

## Member 4 - Dyonathan: Booking & Payment Transactions

### Task 4.1 - Create STRIDE Threats

- Create threats for booking, payment, cancellation, refund, voucher, and reservation history.
- Focus on Repudiation and Tampering.
- Suggested topics:
  - Payment response manipulation.
  - User denies cancellation or refund request.
  - Reservation changed without trace.

### Task 4.2 - Create Abuse Cases

- Create AC07 and AC08.
- Use `artifacts/templates/abuse-case-template.md`.
- Suggested abuse cases:
  - AC07 - Payment Confirmation Tampering.
  - AC08 - Fraudulent Cancellation Repudiation.

### Task 4.3 - Review Requirements

- Review RF22-RF34.
- Review NFR06, NFR10, NFR13, NFR14.
- Add business rules only if booking/refund/payment rules appear.

### Task 4.4 - Optional

- Add simple sequence diagram for booking and payment confirmation.

## Member 5 - Rafaela: Search, Reviews & Messaging

### Task 5.1 - Create STRIDE Threats

- Create threats for room search, public info, notifications, chat, and reviews.
- Focus on Denial of Service and Information Disclosure.
- Suggested topics:
  - Bot overloads room search.
  - Guest chat history exposed.
  - Review manipulation or spam.

### Task 5.2 - Create Abuse Cases

- Create AC09 and AC10.
- Use `artifacts/templates/abuse-case-template.md`.
- Suggested abuse cases:
  - AC09 - Automated Search Abuse.
  - AC10 - Chat or Review Data Exposure.

### Task 5.3 - Review Requirements

- Review RF11-RF13, RF18-RF21, RF41-RF47.
- Review NFR05 and NFR09.
- Add business rules only if communication or review rules appear.

### Task 5.4 - Optional

- Add final considerations.
- Add simple abuse case diagram or mitigation notes if needed.

## Validation

Run only the scripts related to changed artifacts:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-business-rules.ps1
```

Pre-commit also runs RF, NFR, business rules, STRIDE, and abuse case validations.

## Commit Message Suggestions

- Iuri: `Add identity STRIDE threats and abuse cases`
- Sidnei: `Add access control STRIDE threats and abuse cases`
- Lara: `Add accommodation STRIDE threats and abuse cases`
- Dyonathan: `Add booking and payment STRIDE threats and abuse cases`
- Rafaela: `Add search messaging STRIDE threats and abuse cases`

---

# Versao em Portugues

## Integrantes

- **Membro 1 (Lead)**: Iuri - Modulo de Cadastro e Identidade
- **Membro 2**: Sidnei - Modulo de Autenticacao e Controle de Acesso
- **Membro 3**: Lara - Modulo de Acomodacoes e Quartos
- **Membro 4**: Dyonathan - Modulo de Reservas e Pagamentos
- **Membro 5**: Rafaela - Modulo de Busca, Avaliacoes e Mensagens

## Ordem das Tarefas

1. Criar ameacas STRIDE e casos de abuso do modulo.
2. Revisar RFs e NFRs relacionados.
3. Adicionar regras de negocio somente se alguma regra real aparecer.
4. Adicionar diagramas ou mitigacoes somente se sobrar tempo.
5. Rodar validadores dos artefatos alterados antes do commit.

## Divisao

| Membro | Nome | Modulo | RF/NFR Principais | Foco STRIDE | Casos de Abuso |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Membro 1 | Iuri | Cadastro e Identidade | RF01-RF10, NFR01, NFR03, NFR04, NFR20 | Spoofing | AC01, AC02 |
| Membro 2 | Sidnei | Autenticacao e Controle de Acesso | RF01, RF04-RF09, NFR01-NFR04, NFR07 | Elevation of Privilege | AC03, AC04 |
| Membro 3 | Lara | Acomodacoes e Quartos | RF14-RF21, RF35-RF40, NFR13 | Tampering | AC05, AC06 |
| Membro 4 | Dyonathan | Reservas e Pagamentos | RF22-RF34, NFR06, NFR10, NFR13, NFR14 | Repudiation, Tampering | AC07, AC08 |
| Membro 5 | Rafaela | Busca, Avaliacoes e Mensagens | RF11-RF13, RF18-RF21, RF41-RF47, NFR05, NFR09 | Denial of Service, Information Disclosure | AC09, AC10 |

## Tarefas por Membro

### Iuri

- Criar ameacas STRIDE para cadastro, identidade e dados de contas.
- Criar AC01 e AC02.
- Revisar RF01-RF10 e NFR01, NFR03, NFR04, NFR20.
- Sugestoes: cadastro falso de hospede, roubo de conta, abuso de identidade nao verificada.

### Sidnei

- Criar ameacas STRIDE para login, sessao, rotas protegidas e autorizacao por papel.
- Criar AC03 e AC04.
- Revisar RF01, RF04-RF09 e NFR01-NFR04, NFR07.
- Sugestoes: hospede acessa rota interna, recepcionista acessa funcao de gerente, gerente acessa funcao de administrador.

### Lara

- Criar ameacas STRIDE para quartos, status, disponibilidade, tarifas, limpeza e manutencao.
- Criar AC05 e AC06.
- Revisar RF14-RF21, RF35-RF40 e NFR13.
- Sugestoes: alteracao indevida de tarifa, manipulacao de disponibilidade, status falso de quarto.

### Dyonathan

- Criar ameacas STRIDE para reserva, pagamento, cancelamento, reembolso, voucher e historico.
- Criar AC07 e AC08.
- Revisar RF22-RF34 e NFR06, NFR10, NFR13, NFR14.
- Sugestoes: manipulacao de confirmacao de pagamento, negacao de cancelamento, alteracao de reserva sem registro.

### Rafaela

- Criar ameacas STRIDE para busca, informacoes publicas, notificacoes, chat e avaliacoes.
- Criar AC09 e AC10.
- Revisar RF11-RF13, RF18-RF21, RF41-RF47 e NFR05, NFR09.
- Sugestoes: bot sobrecarrega busca, vazamento de chat, spam ou manipulacao de avaliacoes.

## Validacao

Rodar somente scripts dos artefatos alterados:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-business-rules.ps1
```
