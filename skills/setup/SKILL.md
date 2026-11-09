---
name: setup
description: Connect or reconnect JuzPost, answer "what can JuzPost do", pick the workspace, and handle sign-in, disconnected-connector, workspace or access problems with the JuzPost tools. Use whenever the user mentions JuzPost and its tools are missing, signed out or refusing.
---

# JuzPost setup

The user's explicit instructions take priority over this skill. Never schedule, publish or delete without the user's go-ahead in this conversation.

JuzPost schedules and publishes social media posts to YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress. This plugin connects Claude to the JuzPost MCP server at `https://www.juzpost.com/mcp`.

## When JuzPost tools are missing or signed out

Before saying JuzPost isn't available, check whether a JuzPost connector is already added but disconnected or signed out. If it is, say so plainly and give the steps for where the user is:

- **claude.ai, the desktop app or the mobile app:** open Customize → Connectors (https://claude.ai/customize/connectors), find JuzPost, select Connect, sign in to JuzPost, and choose the workspace on the consent screen. Then turn JuzPost on for this chat if it is off.
- **Claude Code:** run `/mcp`, select the JuzPost server, then Authenticate. A JuzPost sign-in page opens in the browser.

If no JuzPost connector is added at all, the user adds it from the Connectors directory (search "JuzPost") or installs this plugin, then follows the same steps.

While the user signs in, offer to collect the post: the text, any media, which platforms or accounts, and when. Then pick up where you left off once the tools load.

Before sign-in, the job is getting the user signed in. Say in one line what JuzPost does and how to connect. Do not bring up plans, prices or upgrades. If the user asks what JuzPost costs, answer briefly and link https://www.juzpost.com/pricing.

If a JuzPost tool call brings up a Connect prompt, the sign-in has expired: the user selects Connect, signs in again, and the same call continues. Nothing is lost.

## "What can you do?"

Call `get_context`. It returns the signed-in user, the current workspace (name, timezone, default posting times), its plan, quotas, limits and `blocked[]`, a plain-language list of anything blocked right now.

- **Nothing blocked:** call `list_accounts`, then answer with the workspace name, its plan by name only (no price or comparison), its timezone, the connected accounts (platform and username), and what you can do: draft, schedule or publish posts with per-account captions, media and times; check platform limits; show the queue and failed posts with the reason; edit or reschedule a scheduled post; switch workspaces. End with one example the user can try, using their own accounts.
- **No accounts connected:** say the workspace has no social accounts yet and that they are connected in the JuzPost dashboard at https://www.juzpost.com/dashboard/accounts, not from Claude.
- **Something blocked, or a tool refuses with an access message:** pass the message on as it is, with its link, and add nothing about plans or prices. If `list_workspaces` shows another workspace with `access: "full"`, offer to switch to it.

## Workspaces

- `list_workspaces` lists every workspace the user belongs to, marks the current one, and shows `access`: `full` (the tools work there) or `none`. It works on every workspace.
- `switch_workspace` moves the connection to another workspace by id or slug. Confirm the workspace with the user first. It also works on every workspace, so a user can always move off one where the tools are refused.

## When something is refused

| What happens | What it means | What to tell the user |
|---|---|---|
| A Connect prompt or sign-in page appears | The sign-in expired or was revoked | Sign in again; nothing is lost |
| An access message with a link to the JuzPost website | This workspace doesn't include the action | Pass the message on as it is. Offer `list_workspaces` if they have other workspaces |
| "no longer a member" | The user was removed from the workspace | Use `list_workspaces`, then `switch_workspace` |
| A rate limit about posts in the last hour | A workspace can create 30 posts per hour through a connector | Wait for the hour to pass |
| An account shows `needs_reconnect` in `list_accounts` | That social account's own sign-in lapsed | Reconnect it at https://www.juzpost.com/dashboard/accounts; skip it for now and say which one |
| A tool you expect is not listed | Its permission wasn't granted at sign-in | Disconnect JuzPost and connect again, granting that permission |
| A call that changes an existing post (`update_post`, or `schedule_post` with a `post_id` and new text or accounts) is refused for the edit permission | The connection was granted without edit | Disconnect JuzPost and connect again with edit ticked. To schedule the draft as it is, call `schedule_post` with only its `post_id` and the time |

## Links

- Tool reference: https://api.juzpost.com/docs
- Support: support@juzpost.com or https://www.juzpost.com/support
- Privacy policy: https://www.juzpost.com/privacy-policy
- Terms: https://www.juzpost.com/terms-of-service
