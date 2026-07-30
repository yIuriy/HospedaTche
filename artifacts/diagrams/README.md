# Mermaid Diagrams

Use Mermaid for source-controlled diagrams.

## Rules

- Write diagram source files with `.mmd`.
- Export images only when needed for delivery or review.
- Keep diagram text in English.
- Use clear component names that match project docs.
- Store exported PNG/SVG files in this folder beside the source file.

## Recommended Init Block

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#f8fafc",
    "primaryTextColor": "#111827",
    "primaryBorderColor": "#2563eb",
    "lineColor": "#374151",
    "secondaryColor": "#ecfeff",
    "tertiaryColor": "#fff7ed",
    "fontFamily": "Arial"
  }
}}%%
```

## Suggested Files

- `context-diagram.mmd`
- `data-flow-diagram.mmd`
- `abuse-cases.mmd`
