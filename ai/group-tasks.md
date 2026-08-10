# Group Tasks by Stage - Minimum Scope

This document defines the minimum group work for each project stage. The English section is the canonical repository version. A PT-BR operational translation is included after it for group use.

## Group Members

| Member | Name | Main Module |
| --- | --- | --- |
| 1 | Iuri | User registration and identity |
| 2 | Sidnei | Authentication and access control |
| 3 | Lara | Accommodation and room operations |
| 4 | Dyonathan | Booking and payment |
| 5 | Rafaela | Search, reviews, notifications, and messaging |

## Shared Rules

- Use the same HospedaTche risks and modules throughout all stages.
- Stages 3 to 7 may use code, pseudocode, configurations, diagrams, or detailed descriptions.
- A complete application implementation is not required.
- Every member must make identifiable commits in different stages.
- Version all documents, diagram sources, exported images, reports, and evidence in GitHub.
- Only perform security tests against the group system, an expressly authorized system, or an intentionally vulnerable educational application.

## Detailed Task Guides

- Stage 1: `ai/stage-1-threat-modeling-tasks.md`
- Stage 2: `ai/stage-2-risk-treatment-tasks.md`
- Stage 3: `ai/stage-3-secure-architecture-tasks.md`
- Stage 4: `ai/stage-4-secure-code-testing-tasks.md`
- Stage 5: `ai/stage-5-vulnerability-verification-tasks.md`
- Stage 6: `ai/stage-6-intrusion-detection-tasks.md`
- Stage 7: `ai/stage-7-devsecops-video-tasks.md`

## Stage Templates

- Stage 3: `artifacts/templates/secure-architecture-template.md`
- Stage 4: `artifacts/templates/secure-code-practice-template.md`
- Stage 5: `artifacts/templates/vulnerability-verification-template.md`
- Stage 6: `artifacts/templates/detection-rule-template.md`
- Stage 7: `artifacts/templates/devsecops-video-template.md`

## Stage 1 - Threat Modeling and Abuse Cases

### Minimum Deliverable

- STRIDE threats for every assigned module;
- abuse cases linked to the threats;
- references to related functional and non-functional requirements;
- updated threat and abuse-case maps;
- successful validation of changed artifacts.

| Member | Minimum Contribution | Main Output |
| --- | --- | --- |
| Iuri | Review identity registration, CPF/email misuse, fake accounts, account takeover, and recovery threats and abuse cases. | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| Sidnei | Review login, session, role, protected-route, and privilege-escalation threats and abuse cases. Coordinate account IDs with Iuri. | `artifacts/threat-modeling/accounts/` and `artifacts/abuse-cases/accounts/` |
| Lara | Review room availability, status, rates, capacity, cleaning, maintenance, and stay-operation threats and abuse cases. | `artifacts/threat-modeling/accommodation/` and `artifacts/abuse-cases/accommodation/` |
| Dyonathan | Review booking, cancellation, expiration, payment, refund, and transaction-audit threats and abuse cases. | `artifacts/threat-modeling/booking/`, `artifacts/threat-modeling/payments/`, `artifacts/abuse-cases/booking/`, and `artifacts/abuse-cases/payment/` |
| Rafaela | Review search overload, hidden data, chat, notifications, reviews, and message-history threats and abuse cases. | `artifacts/threat-modeling/search-messaging/` and `artifacts/abuse-cases/search-messaging/` |

## Stage 2 - Risk Analysis, Prioritization, and Treatment

### Minimum Deliverable

- common probability and impact criteria;
- risk register with score, level, and justification;
- risk prioritization;
- treatment strategy and NIST CSF 2.0 mapping;
- concrete controls, owners, verification evidence, implementation order, and expected residual risk;
- successful risk-treatment validation.

| Member | Minimum Contribution | Main Output |
| --- | --- | --- |
| Iuri | Maintain identity, fake-account, account-takeover, CPF/email exposure, and password-recovery risks. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Sidnei | Maintain authentication, session, route authorization, staff hierarchy, and privilege-escalation risks. Coordinate risk IDs with Iuri. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Lara | Maintain availability, room status, rate, capacity, cleaning, maintenance, and operational risks. | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Dyonathan | Maintain booking-state, cancellation, payment, confirmation, refund, and auditability risks. | `artifacts/risk-treatment/booking/risk-register.md` and `artifacts/risk-treatment/payment/risk-register.md` |
| Rafaela | Maintain search availability, information exposure, chat abuse, notification, and review-manipulation risks. | `artifacts/risk-treatment/search-messaging/risk-register.md` |

## Stage 3 - Secure Architecture Design

### Minimum Deliverable

- three verifiable security requirements derived from high or critical risks;
- three mappings to recognized CWE or OWASP references;
- one secure architecture diagram, including its source and exported image;
- three justified architecture decisions.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Write security requirement SR01 and its vulnerability mapping. | One requirement and one CWE/OWASP mapping |
| Sidnei | Write security requirement SR02 and its vulnerability mapping. | One requirement and one CWE/OWASP mapping |
| Lara | Write security requirement SR03 and its vulnerability mapping. | One requirement and one CWE/OWASP mapping |
| Dyonathan | Create the architecture diagram with users, application, authentication, authorization, database, logs, controls, and relevant external services. | Diagram source and exported image |
| Rafaela | Write and justify AD01, AD02, and AD03, linking each decision to a risk, affected component, and expected result. | Three architecture decisions and final consistency review |

## Stage 4 - Secure Code and Security Tests

### Minimum Deliverable

- two secure coding practices related to Stage 3;
- two tests per practice, defined before the implementation example;
- implementation, pseudocode, configuration, or detailed description;
- expected secure result and OWASP reference for each practice.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Define Practice 1, its related risk and requirement, and its implementation or pseudocode. | Secure Practice 1 |
| Sidnei | Define one valid test and one malicious, invalid, or unauthorized test for Practice 1. | Two tests for Practice 1 |
| Lara | Define Practice 2, its related risk and requirement, and its implementation or pseudocode. | Secure Practice 2 |
| Dyonathan | Define one valid test and one malicious, invalid, or unauthorized test for Practice 2. | Two tests for Practice 2 |
| Rafaela | Add expected results and OWASP references and verify traceability to Stage 3. | Integrated Stage 4 document |

## Stage 5 - Vulnerability Verification

### Minimum Deliverable

- one authorized verification session using OWASP ZAP or an equivalent tool;
- identification of the system, environment, tool, and basic configuration;
- screenshots or report excerpts stored in `evidences/stage-5/`;
- analysis of up to three relevant alerts or findings;
- proposed correction for each finding.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Document the authorized target, environment, scope, and basic test configuration. | Scope and configuration record |
| Sidnei | Execute or document the verification session and organize screenshots or report excerpts. | Execution evidence in `evidences/stage-5/` |
| Lara | Analyze finding A01, including evidence, impact, CWE/OWASP relationship, and correction. | Finding A01 analysis |
| Dyonathan | Analyze finding A02 using the same fields. | Finding A02 analysis |
| Rafaela | Analyze finding A03 and consolidate the report. If fewer findings exist, explain why other tool results were discarded. | Finding A03 or discard justification and final report |

## Stage 6 - Monitoring and Intrusion Detection

### Minimum Deliverable

- a short explanation of intrusion detection;
- the difference between prevention and detection;
- the system events that should be logged;
- three detection rules;
- an initial response for each alert.

Main output: `roteiros/etapa-6-deteccao-de-intrusoes.md`.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Explain intrusion detection and the difference between prevention and detection. | Introductory section |
| Sidnei | Define the authentication, authorization, business, payment, error, and audit events that should be logged without exposing sensitive data. | Logging-events section |
| Lara | Define Rule 1 with observed risk, data source, alert condition, and initial response. | Detection Rule 1 |
| Dyonathan | Define Rule 2 with the same fields. | Detection Rule 2 |
| Rafaela | Define Rule 3 and consolidate the response and escalation guidance. | Detection Rule 3 and final review |

## Stage 7 - DevSecOps and Final Video

### Minimum Deliverable

- a textual description or diagram of the DevSecOps pipeline;
- at least three conditions that stop pipeline continuity;
- a versioned final-video script;
- a final video, preferably 5 to 8 minutes, with participation from all members.

Main output: `roteiros/etapa-7-devsecops-e-video-final.md`.

| Member | Minimum Contribution | Expected Output |
| --- | --- | --- |
| Iuri | Describe planning, threat analysis, security requirements, and architecture in the pipeline and video. | Planning and architecture segment |
| Sidnei | Describe secure implementation and automated security tests in the pipeline and video. | Implementation and tests segment |
| Lara | Describe code and dependency analysis and define at least three pipeline stop conditions. | Analysis gates and stop conditions |
| Dyonathan | Describe dynamic testing, deployment, monitoring, and response in the pipeline and video. | Verification and operations segment |
| Rafaela | Consolidate the pipeline and script, introduce the system, and close with project evolution and lessons learned. | Final script and integration |

All members must appear or speak in the final video and confirm that their contribution is represented accurately.

## Validation Commands

Run only validators related to changed artifacts:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-business-rules.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```

---

# Divisão de Tarefas por Etapa - Escopo Mínimo (PT-BR)

Esta seção traduz a divisão operacional acima. A versão em inglês permanece como referência canônica do repositório.

## Integrantes

| Membro | Nome | Módulo principal |
| --- | --- | --- |
| 1 | Iuri | Cadastro de usuários e identidade |
| 2 | Sidnei | Autenticação e controle de acesso |
| 3 | Lara | Acomodações e operações dos quartos |
| 4 | Dyonathan | Reservas e pagamentos |
| 5 | Rafaela | Busca, avaliações, notificações e mensagens |

## Regras Compartilhadas

- Usar os mesmos riscos e módulos do HospedaTche em todas as etapas.
- Nas Etapas 3 a 7 podem ser usados código, pseudocódigo, configurações, diagramas ou descrições detalhadas.
- Não é necessário implementar o sistema completo.
- Cada integrante deve possuir commits identificáveis em diferentes etapas.
- Versionar no GitHub documentos, fontes de diagramas, imagens exportadas, relatórios e evidências.
- Realizar testes de segurança somente no sistema do grupo, em sistema expressamente autorizado ou em aplicação educacional intencionalmente vulnerável.

## Guias Detalhados por Etapa

- Etapa 1: `ai/stage-1-threat-modeling-tasks.md`
- Etapa 2: `ai/stage-2-risk-treatment-tasks.md`
- Etapa 3: `ai/stage-3-secure-architecture-tasks.md`
- Etapa 4: `ai/stage-4-secure-code-testing-tasks.md`
- Etapa 5: `ai/stage-5-vulnerability-verification-tasks.md`
- Etapa 6: `ai/stage-6-intrusion-detection-tasks.md`
- Etapa 7: `ai/stage-7-devsecops-video-tasks.md`

## Templates das Etapas

- Etapa 3: `artifacts/templates/secure-architecture-template.md`
- Etapa 4: `artifacts/templates/secure-code-practice-template.md`
- Etapa 5: `artifacts/templates/vulnerability-verification-template.md`
- Etapa 6: `artifacts/templates/detection-rule-template.md`
- Etapa 7: `artifacts/templates/devsecops-video-template.md`

## Etapa 1 - Modelagem de Ameaças e Casos de Abuso

### Mínimo Entregável

- ameaças STRIDE para todos os módulos atribuídos;
- casos de abuso ligados às ameaças;
- referências aos requisitos funcionais e não funcionais relacionados;
- mapas de ameaças e casos de abuso atualizados;
- validação dos artefatos alterados concluída com sucesso.

| Integrante | Contribuição mínima | Entrega principal |
| --- | --- | --- |
| Iuri | Revisar ameaças e casos de abuso de cadastro, uso indevido de CPF/e-mail, contas falsas, roubo de conta e recuperação de senha. | `artifacts/threat-modeling/accounts/` e `artifacts/abuse-cases/accounts/` |
| Sidnei | Revisar ameaças e casos de abuso de login, sessão, papéis, rotas protegidas e elevação de privilégio. Coordenar IDs de contas com Iuri. | `artifacts/threat-modeling/accounts/` e `artifacts/abuse-cases/accounts/` |
| Lara | Revisar ameaças e casos de abuso de disponibilidade, status, tarifa, capacidade, limpeza, manutenção e operação da hospedagem. | `artifacts/threat-modeling/accommodation/` e `artifacts/abuse-cases/accommodation/` |
| Dyonathan | Revisar ameaças e casos de abuso de reserva, cancelamento, expiração, pagamento, reembolso e auditoria das transações. | Pastas de `booking` e `payment` em `artifacts/threat-modeling/` e `artifacts/abuse-cases/` |
| Rafaela | Revisar ameaças e casos de abuso de sobrecarga da busca, dados ocultos, chat, notificações, avaliações e histórico de mensagens. | `artifacts/threat-modeling/search-messaging/` e `artifacts/abuse-cases/search-messaging/` |

## Etapa 2 - Análise, Priorização e Tratamento de Riscos

### Mínimo Entregável

- critérios comuns de probabilidade e impacto;
- registro de riscos com pontuação, nível e justificativa;
- priorização dos riscos;
- estratégia de tratamento e mapeamento ao NIST CSF 2.0;
- controles concretos, responsáveis, evidências de verificação, ordem de implementação e risco residual esperado;
- validação do tratamento de riscos concluída com sucesso.

| Integrante | Contribuição mínima | Entrega principal |
| --- | --- | --- |
| Iuri | Manter riscos de identidade, contas falsas, roubo de conta, exposição de CPF/e-mail e recuperação de senha. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Sidnei | Manter riscos de autenticação, sessão, autorização de rotas, hierarquia interna e elevação de privilégio. Coordenar IDs com Iuri. | `artifacts/risk-treatment/accounts/risk-register.md` |
| Lara | Manter riscos de disponibilidade, status, tarifa, capacidade, limpeza, manutenção e operação dos quartos. | `artifacts/risk-treatment/accommodation/risk-register.md` |
| Dyonathan | Manter riscos de estado da reserva, cancelamento, pagamento, confirmação, reembolso e auditoria. | `artifacts/risk-treatment/booking/risk-register.md` e `artifacts/risk-treatment/payment/risk-register.md` |
| Rafaela | Manter riscos de disponibilidade da busca, exposição de informações, abuso do chat, notificações e manipulação de avaliações. | `artifacts/risk-treatment/search-messaging/risk-register.md` |

## Etapa 3 - Projeto de Arquitetura Segura

### Mínimo Entregável

- três requisitos de segurança verificáveis derivados de riscos altos ou críticos;
- três mapeamentos para referências reconhecidas da CWE ou OWASP;
- um diagrama de arquitetura segura, com arquivo-fonte e imagem exportada;
- três decisões de arquitetura justificadas.

| Integrante | Contribuição mínima | Entrega esperada |
| --- | --- | --- |
| Iuri | Escrever o requisito SR01 e mapear sua vulnerabilidade. | Um requisito e um mapeamento CWE/OWASP |
| Sidnei | Escrever o requisito SR02 e mapear sua vulnerabilidade. | Um requisito e um mapeamento CWE/OWASP |
| Lara | Escrever o requisito SR03 e mapear sua vulnerabilidade. | Um requisito e um mapeamento CWE/OWASP |
| Dyonathan | Criar o diagrama com usuários, aplicação, autenticação, autorização, banco, logs, controles e serviços externos relevantes. | Fonte do diagrama e imagem exportada |
| Rafaela | Escrever e justificar AD01, AD02 e AD03, ligando cada decisão ao risco, componente afetado e resultado esperado. | Três decisões e revisão final de coerência |

## Etapa 4 - Código Seguro e Testes de Segurança

### Mínimo Entregável

- duas práticas de código seguro relacionadas à Etapa 3;
- dois testes por prática, definidos antes do exemplo de implementação;
- implementação, pseudocódigo, configuração ou descrição detalhada;
- resultado seguro esperado e referência OWASP para cada prática.

| Integrante | Contribuição mínima | Entrega esperada |
| --- | --- | --- |
| Iuri | Definir a Prática 1, seu risco e requisito relacionados e sua implementação ou pseudocódigo. | Prática Segura 1 |
| Sidnei | Definir um teste válido e um teste malicioso, inválido ou não autorizado para a Prática 1. | Dois testes da Prática 1 |
| Lara | Definir a Prática 2, seu risco e requisito relacionados e sua implementação ou pseudocódigo. | Prática Segura 2 |
| Dyonathan | Definir um teste válido e um teste malicioso, inválido ou não autorizado para a Prática 2. | Dois testes da Prática 2 |
| Rafaela | Adicionar resultados esperados e referências OWASP e conferir a rastreabilidade com a Etapa 3. | Documento integrado da Etapa 4 |

## Etapa 5 - Verificação de Vulnerabilidades

### Mínimo Entregável

- uma sessão autorizada de verificação com OWASP ZAP ou ferramenta equivalente;
- identificação do sistema, ambiente, ferramenta e configuração básica;
- capturas de tela ou trechos de relatório em `evidences/stage-5/`;
- análise de até três alertas ou achados relevantes;
- correção proposta para cada achado.

| Integrante | Contribuição mínima | Entrega esperada |
| --- | --- | --- |
| Iuri | Documentar alvo autorizado, ambiente, escopo e configuração básica do teste. | Registro de escopo e configuração |
| Sidnei | Executar ou documentar a sessão e organizar capturas de tela ou trechos do relatório. | Evidências em `evidences/stage-5/` |
| Lara | Analisar o achado A01 com evidência, impacto, relação CWE/OWASP e correção. | Análise do achado A01 |
| Dyonathan | Analisar o achado A02 usando os mesmos campos. | Análise do achado A02 |
| Rafaela | Analisar o achado A03 e consolidar o relatório. Se houver menos achados, explicar por que outros resultados foram descartados. | Achado A03 ou justificativa de descarte e relatório final |

## Etapa 6 - Monitoramento e Detecção de Intrusões

### Mínimo Entregável

- explicação breve sobre detecção de intrusões;
- diferença entre prevenção e detecção;
- eventos do sistema que devem ser registrados;
- três regras de detecção;
- resposta inicial para cada alerta.

Entrega principal: `roteiros/etapa-6-deteccao-de-intrusoes.md`.

| Integrante | Contribuição mínima | Entrega esperada |
| --- | --- | --- |
| Iuri | Explicar detecção de intrusões e a diferença entre prevenção e detecção. | Seção introdutoria |
| Sidnei | Definir eventos de autenticação, autorização, negócio, pagamento, erro e auditoria que devem ser registrados sem expor dados sensíveis. | Seção de eventos e logs |
| Lara | Definir a Regra 1 com risco observado, fonte de dados, condição do alerta e resposta inicial. | Regra de Detecção 1 |
| Dyonathan | Definir a Regra 2 com os mesmos campos. | Regra de Detecção 2 |
| Rafaela | Definir a Regra 3 e consolidar as orientações de resposta e escalonamento. | Regra de Detecção 3 e revisão final |

## Etapa 7 - DevSecOps e Vídeo Final

### Mínimo Entregável

- descrição textual ou diagrama do pipeline DevSecOps;
- pelo menos três condições que interrompem a continuidade do pipeline;
- roteiro do vídeo final versionado;
- vídeo final, preferencialmente de 5 a 8 minutos, com participação de todos.

Entrega principal: `roteiros/etapa-7-devsecops-e-video-final.md`.

| Integrante | Contribuição mínima | Entrega esperada |
| --- | --- | --- |
| Iuri | Descrever planejamento, análise de ameaças, requisitos de segurança e arquitetura no pipeline e no vídeo. | Trecho de planejamento e arquitetura |
| Sidnei | Descrever implementação segura e testes automatizados de segurança no pipeline e no vídeo. | Trecho de implementação e testes |
| Lara | Descrever análise de código e dependências e definir pelo menos três condições de bloqueio do pipeline. | Portões de análise e condições de bloqueio |
| Dyonathan | Descrever teste dinâmico, implantação, monitoramento e resposta no pipeline e no vídeo. | Trecho de verificação e operação |
| Rafaela | Consolidar pipeline e roteiro, apresentar o sistema e encerrar com evolução do projeto e aprendizados. | Roteiro final e integração |

Todos devem aparecer ou falar no vídeo final e confirmar que sua contribuição foi representada corretamente.

## Comandos de Validação

Rodar somente os validadores relacionados aos artefatos alterados:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-stride-threats.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-abuse-cases.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-business-rules.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-risk-treatment.ps1
```
