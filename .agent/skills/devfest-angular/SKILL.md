---
name: devfest-angular
description: Build and debug Angular features in DEvfest, including components, signals, routing, forms, API integration, and performance. Use for Angular implementation rather than visual-only exploration.
---

# Angular development

Read package.json, angular.json, and nearby code before choosing APIs. This folder may initially contain only agent configuration; do not mistake it for a generated Angular app. For a new app, use a supported stable Angular version and check its Node requirements; for an existing app, preserve its installed version and package manager.

Use the Angular MCP get_best_practices and documentation tools when available, passing the absolute workspace path where supported. Otherwise consult https://angular.dev. Do not invent MCP tool names or claim a successful connection without a tool response.

Prefer standalone components, strict TypeScript, typed inputs and outputs, built-in template control flow, and signals for local synchronous state when supported by the installed version. Use computed values for derived state; avoid effects that merely copy state. Use RxJS for asynchronous streams and cancellation, with lifecycle-safe subscriptions. Respect existing architecture rather than performing incidental migrations.

Organize features around user behavior; isolate HTTP/data access from presentation. Include loading, empty, error, and success states. Use typed reactive forms unless project conventions justify another supported forms API. Validate on the server as well as in the form. Lazy-load feature routes when useful; defer costly views deliberately. Avoid introducing a state library without demonstrated need.

Test the changed behavior using the project's existing runner. Check production compilation and meaningful interaction paths. Do not add a test framework merely to test a small change. Report commands and results accurately, including missing scripts or blockers.

Google Cloud project: devfest-cybernurdin5-20261120. Use the devfest gcloud configuration or explicit project/account flags. Never assume the machine's active account belongs to this project. Keep Gemini credentials on the backend, outside browser bundles and Angular environment files.
