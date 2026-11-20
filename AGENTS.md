# DEvfest development workspace

This folder is the user's shared Angular workspace for Codex and Antigravity. It starts as configuration only; create the application when the user supplies its product requirements.

Load the matching instructions in .agent/skills: devfest-angular for Angular implementation, devfest-ui for interface implementation, devfest-security for sensitive data flows or security review, and devfest-creative for creative direction. Load the installed frontend-design skill for original visual design when available. Read only skills relevant to the task.

Before edits, inspect current files and any uncommitted changes. When multiple people or agents work simultaneously, agree on separate file ownership or separate branches/worktrees. Re-read shared files before modifying them. Preserve others' work; avoid bulk formatting and incidental dependency changes. Keep handoffs concise: changed files, behavior, checks, and remaining work. Do not create parallel agents unless requested.

Cloud account: cybernurdin5@gmail.com. Cloud project: devfest-cybernurdin5-20261120. Use explicit gcloud flags or the devfest configuration rather than the machine's default production configuration. API enablement does not establish working billing or an Antigravity model subscription.

Never commit or print secrets. Use backend environment variables for privileged API keys. Keep .env.example placeholder-only. This setup does not authorize deployments, purchases, or changes to unrelated projects.

Use available MCP tools when they improve the task; configuration alone does not prove connection. Angular workspace tools need a generated app. Verify relevant behavior with the project's own build and test scripts and browser checks when available.
