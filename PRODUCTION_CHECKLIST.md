# ReliefMesh release checklist

## What this build is

ReliefMesh is a challenge demo. Its donor, partner, and allocation data are seeded, and all approvals remain in the browser session. It does not dispatch food, notify people, store personal data, or make external requests.

## Before publishing

- [ ] Deploy to a public HTTPS URL.
- [ ] Verify `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy: require-corp`, and `Permissions-Policy: tools=(self)` on the deployed URL.
- [ ] Open the deployed URL in ChatGPT's in-app browser or Chrome with WebMCP enabled.
- [ ] Confirm all five tools appear and manually test each one.
- [ ] Confirm `propose_rescue_plan` does not change visible state.
- [ ] Confirm `stage_allocation` shows a visible pending plan.
- [ ] Confirm `approve_allocation` rejects any confirmation other than `HUMAN_APPROVED`.
- [ ] Confirm approval says it is local-only and sends no external request.
- [ ] Test the page in an incognito browser window.
- [ ] Create and publish the GitHub repository; ensure the MIT license is visible.
- [ ] Record a concise public YouTube demo under three minutes.

## For a real food-rescue service

Do not connect real partners until server-side authentication, authorization, audit logging, verified contact workflows, real-time inventory integrity, rate limits, data protection, and explicit human confirmation are designed and independently reviewed.
