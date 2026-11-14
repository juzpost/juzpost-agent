---
name: get-started
description: Connect JuzPost, check which workspace and accounts the connection uses, and fix sign-in or workspace problems.
---

# Getting started with JuzPost

The user's explicit instructions take priority over this skill. Never schedule, publish or delete without the user's go-ahead in this conversation.

JuzPost is a social media scheduler for YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress.

## Connecting

1. The first time a JuzPost tool runs, ChatGPT opens the JuzPost sign-in page. The user signs in at https://www.juzpost.com.
2. On the consent screen the user picks the workspace the connection acts on and the permissions to grant. Changing a post that already exists (`update_post`, or a draft's text or accounts) needs the edit permission. If a call is refused because edit was not granted, tell the user to disconnect JuzPost and connect again with edit ticked.
3. After approval the JuzPost tools are available. To disconnect, the user revokes the connection in JuzPost under Settings, Connections.

## Checking the connection

- `get_context` reports the signed-in user, the current workspace, its plan, quotas and a plain-language list of anything blocked right now.
- `list_workspaces` lists every workspace the user belongs to and what each one allows: `none`, `read` or `full`.
- `switch_workspace` moves the connection to another workspace by id or slug. Confirm the workspace with the user first.
- `list_accounts` lists the connected social accounts and whether any needs reconnecting. Accounts are connected in the JuzPost dashboard, not from ChatGPT.

## When something is refused

| Message | Meaning | What to tell the user |
|---|---|---|
| A sign-in page opens again | The connection expired or was revoked | Sign in again; nothing is lost |
| "needs the … plan or higher" | This workspace's plan does not include the action | Pass the message on as it is, or check `list_workspaces` for a workspace that allows it |
| "no longer a member" | The user was removed from the workspace | Use `list_workspaces`, then `switch_workspace` |
| A rate limit message about posts in the last hour | A workspace can create 30 posts per hour through a connector | Wait for the hour to pass |

Support: support@juzpost.com or https://www.juzpost.com/support
