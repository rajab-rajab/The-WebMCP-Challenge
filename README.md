# ReliefMesh

ReliefMesh is a WebMCP-enabled food-rescue coordination workspace. It helps a human coordinator and an agent turn time-sensitive surplus food into an explainable, safe rescue plan.

> **Demo disclosure:** This challenge build uses seeded data. Approvals are local-only; it does not dispatch food, contact partners, or make external requests.

## Why WebMCP

Food-rescue coordination is not a good fit for an agent clicking through an unfamiliar dashboard. The agent needs precise, current context—food quantities, dietary fit, urgency, and pickup windows—and it must not silently commit a consequential allocation.

ReliefMesh registers five imperative WebMCP tools:

1. `inspect_rescue_context` — reads surplus, needs, constraints, and safety policy.
2. `propose_rescue_plan` — produces a transparent, non-mutating allocation proposal.
3. `stage_allocation` — makes the proposal visibly pending for review.
4. `approve_allocation` — changes state only with the exact `HUMAN_APPROVED` confirmation.
5. `generate_pickup_manifest` — creates a driver-ready manifest without changing state.

The result is a shared workflow: the agent handles matching complexity, while the human keeps control of real-world commitments.

## Run locally

This is a dependency-free static site. From this folder:

```powershell
python dev_server.py
```

Then visit `http://localhost:8080`.

To test WebMCP locally in Chrome, enable `chrome://flags/#enable-webmcp-testing`, relaunch Chrome, then open the site. The app uses feature detection, so the visible UI works even where WebMCP is not available.

`dev_server.py`, `_headers`, and `netlify.toml` set the required origin-isolation and permissions headers. They are essential for the WebMCP API, not optional hardening.

## Test script

1. Open the WebMCP tools panel and confirm five capabilities are shown.
2. Ask an agent to inspect current rescue context.
3. Ask it to propose a rescue plan; confirm this does not change visible state.
4. Ask it to stage the plan; inspect the visible allocation and rationale.
5. Approve only after review by passing `HUMAN_APPROVED`.
6. Ask for a pickup manifest.

## License

MIT
