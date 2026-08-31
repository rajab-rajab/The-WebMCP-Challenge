# ReliefMesh

> Human-approved food-rescue coordination with WebMCP.

**Live demo:** [reliefmesh-food-rescue-demo.rajab-baig.chatgpt.site](https://reliefmesh-food-rescue-demo.rajab-baig.chatgpt.site)

**Demo video:** [Watch on YouTube](https://youtu.be/VRzxNNWRqzY)

ReliefMesh is an agent-native coordination workspace for food-rescue teams. It shows how a person and an AI agent can collaborate on time-sensitive allocation decisions: the agent reads structured surplus and partner-need context, proposes a plan with clear reasoning, and can stage a plan for review. A human remains in control of every approval.

The project was created for **The WebMCP Challenge**.

## The problem

Food rescue is highly time-sensitive. Coordinators must consider how much food is available, dietary compatibility, a partner's service time, and pickup windows. A conventional agent has to infer all of that by clicking through a dashboard. That is brittle and can create unsafe or incorrect allocations.

ReliefMesh gives agents explicit, scoped capabilities through WebMCP instead. The agent can use the same visible workspace as the human, but it cannot silently make a real-world commitment.

## How it works

The demo starts with three food-surplus offers and three community-partner needs. Choosing **Build rescue plan** creates an explainable allocation proposal that prioritizes:

1. Urgent service times
2. Dietary compatibility
3. Available meal quantities and pickup windows

The proposed plan is visible in the interface before an approval can be recorded. This makes the decision legible, reviewable, and reversible in the demo.

## WebMCP tools

ReliefMesh uses the WebMCP Imperative API to register five structured tools.

| Tool | What it does | State change |
| --- | --- | --- |
| `inspect_rescue_context` | Returns the available surplus, partner needs, constraints, and local approval policy. | None |
| `propose_rescue_plan` | Produces an explainable allocation proposal. | None |
| `stage_allocation` | Makes a proposed allocation visible for human review. | Local demo state only |
| `approve_allocation` | Records approval only when given the exact `HUMAN_APPROVED` confirmation. | Local demo state only |
| `generate_pickup_manifest` | Produces a driver-ready pickup manifest for the current plan. | None |

Read-only tools are annotated as read-only. The context and planning tools are also marked as potentially untrusted content, helping an agent treat operational data carefully.

## Human-in-the-loop safety

The important design decision is that planning and approval are separate actions:

```text
Inspect context → Propose plan → Stage visibly → Human reviews → Record approval
```

An agent can reduce coordination effort, but it cannot skip the human decision. The approval tool rejects any confirmation other than `HUMAN_APPROVED`.

## Demo disclosure

This is a challenge demo, not a live food-rescue service.

- All donor, partner, and allocation data is seeded.
- Approvals are stored only in the browser session.
- The app does not contact donors, drivers, or community partners.
- The app makes no external requests and stores no personal data.

This explicit boundary keeps the demo honest while demonstrating how the workflow could safely evolve into a real operational product.

## Run locally

### Prerequisites

- Node.js
- Python 3
- A browser with WebMCP support, such as ChatGPT's in-app browser or Chrome with WebMCP testing enabled

### Start the app

```powershell
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

The local server supplies the origin-isolation and permissions headers needed by WebMCP. If a browser shows a stale local preview, use a hard refresh (`Ctrl+Shift+R`).

### Test WebMCP locally

1. In Chrome, enable `chrome://flags/#enable-webmcp-testing` and relaunch it, or use ChatGPT's in-app browser.
2. Open the local app.
3. Open the **WebMCP tools** panel to see the five registered capabilities.
4. Ask an agent to inspect the rescue context and propose a plan.
5. Stage the allocation and confirm that the plan becomes visible.
6. Approve it only after reviewing the plan. The app records the approval locally and sends nothing externally.

## Project structure

```text
index.html       Product interface and accessible UI structure
styles.css       Responsive visual design
app.js           Demo data, planning logic, interaction flow, and WebMCP tools
dev_server.py    Local server with required WebMCP headers
build.js         Creates the Cloudflare-compatible Sites bundle
_headers         Static-host header configuration
netlify.toml     Netlify-compatible header configuration
PRODUCTION_CHECKLIST.md  Deployment and judge-testing checklist
```

## Deploying

The project contains a production build command:

```powershell
npm run build
```

The build produces a Cloudflare-compatible bundle for ChatGPT Sites. Any host must serve these headers for WebMCP to be available:

```text
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Permissions-Policy: tools=(self)
```

See [`PRODUCTION_CHECKLIST.md`](PRODUCTION_CHECKLIST.md) before publishing a new version.

## Future enhancements

ReliefMesh could become a real food-rescue platform with:

- Authenticated coordinator, donor, driver, and partner roles
- Real-time inventory and pickup availability
- Maps, route optimization, and accessibility-aware delivery planning
- Dietary, allergy, capacity, and food-safety constraints
- A secure server-side approval and audit trail
- Partner notifications only after a verified human confirmation
- Multi-language support for local communities
- Impact reporting: meals rescued, emissions avoided, and service reliability

Those additions require authentication, authorization, privacy protections, reliable inventory validation, rate limiting, and an independently reviewed safety model before connecting any real-world partners.

## License

This project is released under the [MIT License](LICENSE).
