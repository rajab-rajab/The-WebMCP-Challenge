# ReliefMesh — 2.5-Minute Demo Video

**Target length:** 2 minutes 30 seconds
**Format:** Screen recording with your voice; use the deployed site and a WebMCP-enabled browser.
**Live demo:** https://reliefmesh-food-rescue-demo.rajab-baig.chatgpt.site/

## Before you record

1. Use a browser where WebMCP is available and make sure the page is refreshed.
2. Set the recording to 1080p. Show only the browser and keep the zoom at 100%.
3. Start on the ReliefMesh home screen. Keep the **WebMCP tools** panel closed.
4. If practical, have the agent/chat panel ready beside the site so viewers can see tool calls. If that view is not available, use the visible in-app flow and say that the same actions are exposed as WebMCP tools.

## Timed storyboard and narration

| Time | Show on screen | Say |
| --- | --- | --- |
| 0:00–0:15 | ReliefMesh landing screen. Pause on the donor offers and partner needs. | “Food rescue is a race against time. A coordinator has to match fresh surplus with the right community partner, while respecting dietary needs and pickup windows. ReliefMesh is a human-approved coordination workspace built for people and AI agents to solve that together.” |
| 0:15–0:32 | Click **WebMCP tools**. Slowly scroll through the five tools. | “Instead of forcing an agent to guess from clicks on a dashboard, ReliefMesh gives it five explicit WebMCP capabilities: inspect the rescue context, propose a plan, stage it for review, record human approval, and create a pickup manifest.” |
| 0:32–0:48 | Point at **inspect_rescue_context** and **propose_rescue_plan**. Close the panel. | “The first two tools are read-only. They return structured donor offers, community needs, dietary fit, and time constraints. That gives the agent useful context without letting it silently change anything.” |
| 0:48–1:08 | Click **Build rescue plan**. Let the allocation card appear. | “Here is the proposed plan. ReliefMesh prioritizes the Night Shelter’s urgent 6:30 service, matches halal rice bowls to that need, sends bakery items to Family Hub, and directs vegan produce to the Youth Centre. The reasoning and confidence are visible before anyone commits.” |
| 1:08–1:28 | Hover over the three allocation rows and the explanatory text. | “This is the key experience improvement: the agent turns fragmented operational information into an explainable proposal. The coordinator can review the exact donors, recipients, quantities, timing, and rationale in one place.” |
| 1:28–1:50 | If your browser agent can call tools, call `stage_allocation`, then show the staged plan. Otherwise point to the visible draft state. | “The agent can now stage the allocation, but staging is only a visible pending state. No donor, driver, or partner is contacted. The interface makes the handoff from agent recommendation to human decision clear and reviewable.” |
| 1:50–2:10 | Review the plan, then click **Approve allocation**. Show “Approval recorded locally.” | “Only after a person reviews the plan can approval be recorded. The WebMCP approval tool requires the exact confirmation `HUMAN_APPROVED`. In this demo, approval is stored only in the browser—there is no real dispatch and no external notification.” |
| 2:10–2:25 | Reopen **WebMCP tools**; point at `generate_pickup_manifest`. | “After approval, an agent can generate a driver-ready pickup manifest from the approved plan. The workflow is useful because people and agents can coordinate quickly without giving the agent unchecked authority.” |
| 2:25–2:30 | Return to the ReliefMesh title/plan. | “ReliefMesh imagines a safer agent-native web: structured collaboration, human judgment at the commitment point, and less food going to waste.” |

## WebMCP agent-call backup

If your browser exposes agent tool calls, use this short sequence during the 1:28–2:25 portion:

1. “Inspect the current rescue context and propose a plan prioritizing urgency and dietary fit.”
2. “Stage the proposed allocation for my review.”
3. After reviewing the visible plan: “I approve this plan. Call `approve_allocation` with confirmation `HUMAN_APPROVED`.”
4. “Generate the pickup manifest.”

Only use the third prompt after you have shown the plan and said the approval sentence out loud.

## Recording checklist

- [ ] Keep narration under 2:30; leave 5–10 seconds buffer below Devpost’s 3-minute limit.
- [ ] Show the five WebMCP tools and identify the read-only / human-confirmation boundary.
- [ ] Show a real plan being created and visibly reviewed.
- [ ] Say explicitly that the app is a local-data demo with no external dispatch.
- [ ] Keep computer notifications, personal browser tabs, and credentials out of frame.
- [ ] Upload the final video publicly to YouTube and copy its public link into the Devpost form.
