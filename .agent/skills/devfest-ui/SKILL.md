---
name: devfest-ui
description: Implement and refine responsive, accessible interfaces in DEvfest, including visual hierarchy, design tokens, forms, navigation, and interactive states.
---

# Interface quality

Start from the user's main action and the existing visual language. Reuse project components before introducing a new UI kit. For new designs, choose a coherent type scale, spacing scale, color palette, corner treatment, and content width; express repeated choices as CSS custom properties or existing tokens.

Use semantic HTML, real buttons and links, visible labels, keyboard navigation, visible focus, and adequate contrast. Dialogs need focus management and a usable close action. Never communicate validation or status through color alone. Respect reduced-motion preferences and preserve readable zoom behavior.

Build fluid layouts and check narrow mobile, tablet, and desktop widths. Exercise long text, empty lists, validation errors, loading, and disabled controls. Keep content readable without horizontal page scrolling. Keep primary actions clear and destructive actions distinguishable.

Use the available browser tooling to inspect the running app and exercise the changed flow. Compare an actual screenshot with the intended hierarchy; fix clipping, overlap, and weak contrast. Automated accessibility checks supplement keyboard and visual checks. If no app or browser is available, say what remains unverified.

When frontend-design is installed, load it for original visual direction and apply that direction within Angular conventions. Do not import a React implementation or unnecessary dependencies simply because a reference uses them.
