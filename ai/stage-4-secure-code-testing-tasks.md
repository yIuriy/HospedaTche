# Stage 4 - Secure Code and Security Test Task Division

This document defines the minimum Stage 4 work division. Stage 4 demonstrates how Stage 3 requirements and decisions become secure coding practices and verifiable tests.

## Shared Goal

```text
risk and requirement -> tests defined first -> secure practice -> implementation example -> expected result
```

## Shared Rules

- Select only two secure coding practices.
- Link each practice to a Stage 2 risk and Stage 3 requirement.
- Define two tests for each practice before showing the solution.
- Include one valid test and one malicious, invalid, or unauthorized test per practice.
- Use implementation, pseudocode, configuration, or a detailed step-by-step description.
- Cite an applicable OWASP Cheat Sheet, ASVS requirement, or equivalent OWASP reference.
- A complete application implementation is not required.

## Minimum Deliverable

- two secure coding practices;
- four security tests in total;
- implementation or detailed solution for each practice;
- expected secure result for each test;
- OWASP references and traceability to previous stages.

Recommended output:

```text
artifacts/secure-code/secure-code-and-tests.md
```

## Required Practice Structure

Each practice must contain:

| Field | Required Content |
| --- | --- |
| Related Risk | Risk ID from Stage 2 |
| Related Requirement | Security requirement from Stage 3 |
| Practice | Secure behavior being adopted |
| Test 1 | Valid or authorized use case |
| Test 2 | Malicious, invalid, or unauthorized use case |
| Expected Results | Secure result for both tests |
| Solution | Code, pseudocode, configuration, or detailed description |
| Reference | Relevant OWASP source |

## Member Assignment

| Member | Minimum Work | Expected Output |
| --- | --- | --- |
| Iuri | Define Practice 1, its source risk and requirement, and its solution example. | Practice 1 and implementation or pseudocode |
| Sidnei | Define the valid and malicious/unauthorized tests for Practice 1 before the solution section. | Tests ST01 and ST02 |
| Lara | Define Practice 2, its source risk and requirement, and its solution example. | Practice 2 and implementation or pseudocode |
| Dyonathan | Define the valid and malicious/unauthorized tests for Practice 2 before the solution section. | Tests ST03 and ST04 |
| Rafaela | Add expected results and OWASP references and verify full traceability. | Integrated Stage 4 document |

## Suggested Practice Options

Choose only two options that address the selected risks:

- server-side authorization;
- input validation and output encoding;
- parameterized database access;
- secure password storage;
- session protection;
- secure error handling;
- secrets protection;
- audit logging without sensitive-data exposure.

## Shared Final Review

Confirm that:

- the four tests appear before their solution examples;
- each practice includes one normal and one adversarial scenario;
- expected results are observable and unambiguous;
- solutions actually satisfy the tests;
- OWASP references are relevant and identifiable;
- no unimplemented example is presented as production evidence.

---

# Etapa 4 - Divisão de Tarefas de Código Seguro e Testes de Segurança

## Objetivo Compartilhado

Mostrar como requisitos e decisões da Etapa 3 se tornam práticas seguras e testes verificáveis.

```text
risco e requisito -> testes definidos primeiro -> prática segura -> exemplo de solução -> resultado esperado
```

## Mínimo Entregável

- duas práticas de código seguro;
- dois testes para cada prática, totalizando quatro;
- um teste válido e um teste malicioso, inválido ou não autorizado por prática;
- implementação, pseudocódigo, configuração ou descrição detalhada;
- resultado esperado e referência OWASP por prática.

## Divisão por Integrante

| Integrante | Tarefa mínima | Entrega |
| --- | --- | --- |
| Iuri | Definir a Prática 1, risco, requisito e exemplo de solução. | Prática 1 e solução |
| Sidnei | Definir o teste válido e o teste adversarial da Prática 1 antes da solução. | ST01 e ST02 |
| Lara | Definir a Prática 2, risco, requisito e exemplo de solução. | Prática 2 e solução |
| Dyonathan | Definir o teste válido e o teste adversarial da Prática 2 antes da solução. | ST03 e ST04 |
| Rafaela | Adicionar resultados esperados, referências OWASP e rastreabilidade. | Documento integrado |

## Estrutura Obrigatoria

Cada prática deve registrar risco, requisito, prática, dois testes, resultados esperados, solução e referência OWASP.

## Revisão Final

- conferir que os testes aparecem antes da solução;
- conferir um cenário normal e um adversarial por prática;
- conferir resultados objetivos;
- conferir se a solução satisfaz os testes;
- conferir referências OWASP;
- não apresentar pseudocódigo como evidência de produção.
