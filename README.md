# Oranje DS

A small React design system: design tokens as CSS custom properties, and components that reference
them by name.

```
src/
  components/Button.tsx    the one component so far
  styles/tokens.css        color, radius and spacing tokens
  lib/utils.ts             className merge helper
```

## Button

```tsx
import { Button } from "oranje-ds";

<Button variant="primary" size="md">Save changes</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="danger" loading>Deleting…</Button>
```

| Prop      | Values                                            | Default   |
| --------- | ------------------------------------------------- | --------- |
| `variant` | `primary` `secondary` `outline` `ghost` `danger`  | `primary` |
| `size`    | `sm` `md` `lg`                                     | `md`      |
| `block`   | `true` `false`                                     | `false`   |
| `loading` | `true` `false`                                     | `false`   |

`loading` also disables the button — one that looks busy but still fires is the failure this
avoids.

## Tokens

All color, radius and spacing values live in `src/styles/tokens.css`. Components reference them as
`var(--color-primary)` and never inline a literal, so a palette change is a one-file edit.
