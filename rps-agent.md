# rps-agent.md

Instructions for RPS Studio when it generates components into this repository.

This file is read before every generation. Edit it to change how components are written — it is the
one place those rules live, and it is reviewed like any other change to this repo.

## Project

- Framework: react
- Language: ts
- Component directory: `src/components/figma`
- Token file: `src/styles/tokens.css`

## Imports

This project declares NO path aliases in tsconfig.json. Use RELATIVE imports (`../lib/utils`), never `@/…` — an aliased import will not resolve and the file will not compile.

## Dependencies

Only these runtime dependencies are available:

- `class-variance-authority`
- `clsx`
- `react`
- `tailwind-merge`

Do NOT import anything outside that list. If a component genuinely requires a new dependency, say so
in the pull request description instead of importing it — an import of an undeclared package
compiles for nobody.

## Styling

- Reference design tokens by name (`var(--token-name)`) for every colour, radius, spacing and type value.
- Do NOT inline literal values, and do NOT invent token names.
- Do NOT use utility classes from Tailwind themes or component libraries this repository does not
  depend on. `bg-muted`, `rounded-card` and similar are meaningless here unless the dependency list
  above says otherwise.

## Exports

Every new component must be exported from the package entry point so it is reachable by consumers.
A component that is not exported is dead code.

## Accessibility

Real semantics, keyboard operable, visible focus. Not an optional pass.
