---
name: devfest-security
description: Review and improve DEvfest security when changing authentication, authorization, user input, data access, secrets, uploads, or Gemini and Cloud integrations, or when a security review is requested.
---

# Application security

Map the changed data flow and trust boundaries first: browser, API, identity provider, storage, and external services. Focus review on reachable risks introduced or affected by the task. State findings with file location, attack precondition, impact, and a concrete fix; distinguish confirmed issues from hypotheses.

Keep Gemini keys, service-account credentials, and privileged tokens out of Angular source, environment.ts, browser storage, screenshots, logs, and committed files. Public frontend configuration is not a secret. Route privileged AI calls through an authenticated backend with input limits, request throttling, and bounded model usage. Do not make an expensive endpoint publicly callable merely to simplify a demo.

Enforce authorization server-side for every protected operation and object; a route guard is only a user-interface control. Validate request shape and size on the server. Use parameterized database operations. Preserve Angular template escaping; avoid bypassSecurityTrust APIs and direct innerHTML with untrusted content. Constrain upload type and size and prevent executable content from being served unsafely.

For cookie sessions, assess secure cookie flags and CSRF protections; for token flows, follow the identity provider's supported design. Configure explicit CORS origins when appropriate. Apply least-privilege Cloud roles; do not grant Owner as a default fix. Separate development from production.

Inspect dependency audit results for affected, reachable packages and compatible fixes. Do not run force upgrades or break the lockfile to eliminate an advisory count. Validate fixes with an unauthorized-access case, malformed input, or other relevant negative test. Scope scans to the user's own project and authorized targets.

Never claim the app is fully secure. Summarize what was reviewed, what was fixed, and material untested assumptions. Deployment, billing changes, credential rotation, and changes to unrelated accounts require task-specific authorization.
