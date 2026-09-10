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

Already declared:

- `class-variance-authority`
- `clsx`
- `react`
- `tailwind-merge`

Prefer what is already here. A new dependency IS allowed when the component genuinely needs one —
import it normally and RPS adds it to `package.json` in the same pull request, so `npm install`
makes the code run. Do not edit `package.json` by hand in generated code, and do not import a
package you do not actually use.

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
