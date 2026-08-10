# Stage 7 - DevSecOps and Final Video Task Division

This document defines the minimum Stage 7 work division. Stage 7 integrates the project artifacts into a continuous security workflow and a concise final presentation.

## Shared Goal

Show how security follows HospedaTche from planning through operation and summarize the project's evolution in a final video.

## Minimum Deliverable

- a textual description or diagram of a DevSecOps pipeline;
- security activities and evidence for each pipeline moment;
- at least three conditions that stop pipeline continuity;
- a versioned final-video script;
- a final video, preferably 5 to 8 minutes;
- participation from all five members.

Required output:

```text
roteiros/etapa-7-devsecops-e-video-final.md
```

A real pipeline implementation is not required.

## Pipeline Minimum Content

The pipeline must cover:

| Moment | Minimum Security Activity |
| --- | --- |
| Planning | Requirements, STRIDE, abuse cases, and risk analysis |
| Architecture | Security requirements, vulnerability mappings, and decisions |
| Implementation | Secure coding practices and tests |
| Automated Verification | Security tests and code or dependency analysis |
| Dynamic Verification | OWASP ZAP or equivalent authorized verification |
| Deployment | Approval and security stop conditions |
| Operation | Logs, detection rules, response, and recovery |

Each moment should identify the evidence produced and the condition required to continue.

## Required Stop Conditions

Define at least three objective conditions, such as:

- a security test fails;
- a critical vulnerability has not been analyzed;
- a secret is detected in the repository;
- a dependency contains an unacceptable known vulnerability;
- an access-control test fails.

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Describe planning, threat analysis, risks, security requirements, and architecture for the pipeline and video. | Planning and architecture segment |
| Sidnei | Describe secure implementation and automated security testing for the pipeline and video. | Implementation and test segment |
| Lara | Describe code and dependency analysis and define at least three objective stop conditions. | Analysis gates and stop conditions |
| Dyonathan | Describe dynamic verification, deployment, monitoring, response, and recovery. | Verification and operation segment |
| Rafaela | Consolidate the pipeline and video script, introduce HospedaTche, and close with project evolution and lessons learned. | Integrated document and opening/closing segments |

## Video Minimum Content

The video should present:

- the HospedaTche system and user roles;
- main threats and abuse cases;
- prioritized risks;
- security requirements and architecture decisions;
- two secure coding practices and their tests;
- main vulnerability-verification results;
- three detection rules;
- proposed DevSecOps pipeline;
- lessons learned.

It is not necessary to show every table. Prioritize the main decisions and the connection among stages.

## Participation Record

The script should identify the speaker and estimated duration of each segment. All members must appear or speak and should review whether their contributions are represented accurately.

## Shared Final Review

Confirm that:

- every stage appears in the pipeline and video;
- at least three stop conditions are objective;
- pipeline evidence corresponds to actual repository artifacts;
- the script identifies all speakers;
- estimated duration remains close to 5 to 8 minutes;
- the video does not expose credentials, tokens, personal data, or sensitive test details;
- the final delivery location or link is recorded as required by the course.

---

# Etapa 7 - Divisão de Tarefas de DevSecOps e Vídeo Final

## Objetivo Compartilhado

Mostrar como a segurança acompanha o HospedaTche do planejamento até a operação e resumir a evolução do projeto no vídeo final.

## Mínimo Entregável

- descrição textual ou diagrama do pipeline DevSecOps;
- atividade e evidência de segurança em cada momento;
- pelo menos três condições de bloqueio;
- roteiro do vídeo versionado;
- vídeo final, preferencialmente de 5 a 8 minutos;
- participação dos cinco integrantes.

## Divisão por Integrante

| Integrante | Tarefa mínima | Entrega |
| --- | --- | --- |
| Iuri | Descrever planejamento, ameaças, riscos, requisitos e arquitetura no pipeline e vídeo. | Trecho de planejamento e arquitetura |
| Sidnei | Descrever implementação segura e testes automatizados. | Trecho de implementação e testes |
| Lara | Descrever análise de código e dependências e definir pelo menos três bloqueios objetivos. | Portões de análise e bloqueios |
| Dyonathan | Descrever verificação dinâmica, implantação, monitoramento, resposta e recuperação. | Trecho de verificação e operação |
| Rafaela | Consolidar pipeline e roteiro, apresentar o sistema e encerrar com evolução e aprendizados. | Documento integrado, abertura e encerramento |

## Conteúdo Mínimo do Pipeline

Incluir planejamento, arquitetura, implementação, testes automatizados, análise de código e dependências, verificação dinâmica, implantação, monitoramento, resposta e recuperação.

Cada momento deve indicar atividade, evidência produzida e condição para continuar.

## Conteúdo Mínimo do Vídeo

- sistema e papéis;
- principais ameaças e casos de abuso;
- riscos priorizados;
- requisitos e decisões de arquitetura;
- duas práticas seguras e testes;
- principais resultados da verificação;
- três regras de detecção;
- pipeline proposto;
- aprendizados.

## Revisão Final

- conferir todas as etapas no pipeline e vídeo;
- conferir pelo menos três bloqueios objetivos;
- ligar evidências aos artefatos reais;
- identificar falas e duração de todos os integrantes;
- manter duração aproximada de 5 a 8 minutos;
- remover credenciais, tokens, dados pessoais e detalhes sensíveis;
- registrar o local ou link da entrega final.
