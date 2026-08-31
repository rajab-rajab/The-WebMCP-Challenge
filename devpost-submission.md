# Title

ReliefMesh

## One-line Summary

ReliefMesh is a WebMCP-powered food-rescue coordination workspace where agents create explainable allocation proposals and people approve every commitment.

## Problem

Food rescue requires rapid matching of time-sensitive surplus with the right community partner. Coordinators must reconcile quantities, dietary compatibility, service times, and pickup windows. Asking an agent to infer that context from a conventional dashboard is brittle and makes it difficult to preserve human oversight at the moment of commitment.

## Solution

ReliefMesh exposes structured, scoped WebMCP tools so an agent can inspect current demo data, propose an allocation, stage it visibly for review, record approval only after an explicit human confirmation, and generate a pickup manifest. The human sees and approves the allocation before any commitment is represented.

## Why This Matters

The workflow demonstrates a practical agent-native web pattern for high-consequence coordination: agents reduce cognitive load and make a transparent recommendation; people retain authority to make the final decision. In a real food-rescue service, this could reduce time-to-match while preserving accountability.

I was inspired by the amount of good food that can go to waste while community kitchens and shelters still need meals. Matching food to the right place is not only about quantity. It also depends on time, dietary needs, and whether a person has checked the plan. I wanted to explore how an AI agent could help with this work without making decisions by itself.

ReliefMesh is a food-rescue coordination demo. It shows food offers, partner needs, meal quantities, dietary fit, and pickup windows. An agent can inspect this information and suggest a rescue plan. The plan is shown clearly in the app before approval. A person must review it and give the exact `HUMAN_APPROVED` confirmation before the app records approval.

We built ReliefMesh as a simple web app with HTML, CSS, and JavaScript. The app uses WebMCP through `document.modelContext.registerTool` to register five tools: inspecting rescue context, proposing a plan, staging an allocation, approving an allocation, and generating a pickup manifest. We deployed the project on ChatGPT Sites and added the headers needed for WebMCP. We used Codex to help plan, build, test, document, and deploy the project.

The main challenge was making the AI useful without giving it too much control. We separated planning from approval so that the agent can suggest and stage a plan, but cannot make a commitment on its own. Another challenge was testing WebMCP in a supported browser. We checked that `document.modelContext` was available and that all five tools were registered before recording the demo.

We are proud that ReliefMesh has a complete working flow from food offers to local approval. We are also proud of the safety design: the plan is visible before approval, the confirmation must be explicit, and the demo never sends a real-world dispatch or notification.

We learned that good agent experiences need clear boundaries. A tool should say exactly what it can do, what information it uses, and when a person must step in. We also learned how browser permissions, isolation headers, and structured tool inputs affect WebMCP. The biggest lesson was that human approval is not a limitation; it is an important part of a safe workflow.

The current version uses seeded demo data and records approval only in the browser. Next, we would add secure user roles for coordinators, donors, drivers, and community partners; live inventory and pickup availability; route planning; a server-side approval history; and partner notifications that happen only after verified human approval. These features would require careful privacy, security, and operational testing before use with real organizations.

## How We Used AI

The product’s agent capability is implemented through five WebMCP Imperative API tools. They return structured rescue context and an explainable plan, while the sensitive approval capability requires the exact `HUMAN_APPROVED` confirmation. Read-only tools are annotated accordingly, and context/planning operations use untrusted-content hints.

## How We Used Codex

Codex was used to design the product experience, implement and harden the WebMCP tool registration, build the static application and deployment configuration, test the production build, document the workflow, and troubleshoot local preview behavior.

## Key Features

- Structured donor offers, community-partner needs, dietary fit, capacity, and pickup-window context
- Explainable allocation proposal prioritizing urgent service and dietary compatibility
- Five WebMCP tools: inspect context, propose plan, stage allocation, approve allocation, generate manifest
- Visible staging and explicit human confirmation before approval
- Local-only demo state: no external notifications, dispatches, user accounts, or personal data

## Architecture

ReliefMesh is a static HTML, CSS, and JavaScript web application. `app.js` holds the seeded demo data, planning workflow, UI state, and WebMCP Imperative API registrations through `document.modelContext.registerTool`. Local and production configurations include the headers required for WebMCP: COOP, COEP, and `Permissions-Policy: tools=(self)`.

## Testing Instructions

1. Open the public demo link in ChatGPT’s in-app browser or Chrome with WebMCP enabled.
2. Open the WebMCP tools panel and confirm five listed capabilities.
3. Ask an agent to inspect the rescue context and propose a plan, or click **Build rescue plan** for the interactive fallback.
4. Confirm the proposed plan is visible before approval.
5. Stage the allocation, review it, and approve only with `HUMAN_APPROVED`.
6. Confirm that the app shows local approval only; no dispatch or notification is sent.

## Public Demo Link

https://reliefmesh-food-rescue-demo.rajab-baig.chatgpt.site/

## Public Repository Link

https://github.com/rajab-rajab/The-WebMCP-Challenge

## Demo Video

https://youtu.be/VRzxNNWRqzY

## Screenshot Shot List

1. Landing screen showing food surplus offers and community-partner needs
2. WebMCP tools modal displaying all five tools and their safety modes
3. Visible rescue allocation plan with rationale and confidence
4. Local approval-recorded state with the demo-only disclosure

## Submission Readiness Notes

- Live demo URL: ready
- Public GitHub repository and MIT license: ready
- Source, run instructions, tool documentation: ready
- Demo video: still required; record and upload publicly
- WebMCP agent-client testing: document the actual client/browser used in the official form

## Known Limitations

This is an interactive demo using seeded data. Approval is browser-local and does not communicate with donors, drivers, or partners. Real deployment would require authenticated roles, secure server-side audit trails, verified inventory, operational integrations, privacy controls, and independently reviewed safety processes.

## TODO Official Form Fields

- Submitter Type: Individual (confirm before final submission)
- Country of residence: Pakistan (confirm before final submission)
- App Status: New
- Live URL: https://reliefmesh-food-rescue-demo.rajab-baig.chatgpt.site/
- Public Code Repo: https://github.com/rajab-rajab/The-WebMCP-Challenge
- Tested WebMCP client(s): record the actual browser/client used in the demo
- AI tools leveraged: Codex and ChatGPT Sites
- Learning level: Significant (confirm before final submission)
- Career AI value: Yes (confirm before final submission)
