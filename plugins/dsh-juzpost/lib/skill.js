/**
 * The `juzpost` skill body registered on `ctx.skills`.
 *
 * It teaches the agent the order of operations for the JuzPost MCP tools that
 * the sibling `juzpost-mcp` row exposes as `mcp__juzpost__*`. Kept as a plain
 * string so the plugin ships no extra files and needs no filesystem access.
 */

export const SKILL_NAME = 'juzpost'

export const SKILL_DESCRIPTION =
  'Draft, schedule or publish social media posts through JuzPost (YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr, WordPress). Use when the user wants to post to social media, list connected accounts, review the queue or explain a failed post.'

export const SKILL_CONTENT = `# JuzPost

JuzPost is a social media scheduler. The \`mcp__juzpost__*\` tools talk to the
user's JuzPost workspace. The user's explicit instructions take priority over
this skill. Never schedule, publish or delete without the user's go-ahead.

## 1. Check the connection

Call \`mcp__juzpost__get_context\` for the workspace, its timezone, default
posting times, plan, limits and \`blocked[]\`. If posting is blocked, pass the
message on as it is before collecting any post details. Do not bring up plans
or prices on your own.

## 2. Pick the accounts

Call \`mcp__juzpost__list_accounts\` for account ids, platforms, usernames and
health. If the user names a group ("my brand accounts"), call
\`mcp__juzpost__list_groups\`. Skip accounts whose \`health.status\` is
\`needs_reconnect\` and say which ones. If there are no accounts, say they are
connected at https://www.juzpost.com/dashboard/accounts, not from here.

Never guess an account id. If the user names a platform that is not in the
list, say so and stop.

## 3. Get the brief

Ask for anything missing:
- \`type\`: \`text\`, \`image\`, \`video\` or \`blog\` (a WordPress blog post). Never guess it.
- \`content\` (the caption), and \`title\` where the platform has one (YouTube, Pinterest, every blog post).
- Media, if the type needs it.
- The time, read in the workspace timezone, or "now".

## 4. Check the fit

For captions, titles or media near a limit, call
\`mcp__juzpost__get_platform_limits\` for the platforms involved.

## 5. Platform choices

A Pinterest account needs a board: call \`mcp__juzpost__list_options\` with
\`req_type\` \`list_board\`, ask which one, and pass it as \`pinterest\` keyed by
account id with \`board_id\`. For a WordPress post type other than a blog post,
use \`list_post_type\`. For Bluesky images or video, ask for alt text per file
and whether a content warning is needed (\`bluesky\`: \`alt_text\`, \`labels\`).

## 6. Attach media

- A public link: \`mcp__juzpost__upload_media\` with \`url\`, keep the \`media_key\`. A public link can also go straight into \`media_urls\`.
- A local file: \`mcp__juzpost__create_upload_url\`, then PUT the original bytes, unchanged, to \`upload_url\` with the returned header. Keep the \`media_key\`.

## 7. Confirm

Show the caption, media, each account (platform and username), any per-account
differences, and the time in the workspace timezone. Wait for the user to agree.

## 8. Schedule

One \`mcp__juzpost__schedule_post\` call creates and schedules the post:
\`type\`, \`content\`, \`title\` if needed, \`media_keys\` or \`media_urls\`,
\`account_ids\`, either \`publish_at\` (ISO 8601 UTC, at least 10 minutes ahead)
or \`publish_now: true\`, and an \`idempotency_key\` so a retry never makes a
second post.

- Facebook text post with a link: set \`platform_settings.facebook.link\` and tell the user Facebook shows a preview card.
- Different text per account: \`account_overrides\` keyed by account id (\`title\`, \`description\`, \`hashtags\`); one text for every account of a platform: \`channel_overrides\` keyed by platform id.
- Different media or cover per account: \`media_by_account\`, \`cover_by_account\`.
- Different time per account: \`publish_at_overrides\` keyed by account id.
- Platform settings: \`tiktok\`, \`pinterest\`, \`facebook\`, \`bluesky\`, \`wordpress\`, each keyed by account id.

To save a draft without scheduling, use \`mcp__juzpost__create_post\` with the
same fields and schedule it later with \`schedule_post\` and its \`post_id\`.

## 9. Report

Call \`mcp__juzpost__get_post\` and show each account's status. Refer to the
post by its caption or title and to accounts by platform and username, never by id.

## Existing posts

- \`mcp__juzpost__list_posts\` filters by \`status\` (\`draft\`, \`scheduled\`, \`published\`, \`failed\`), \`accountId\`, \`from\`/\`to\`; \`sort: "scheduledFor"\` orders by publish time.
- \`mcp__juzpost__update_post\` edits a draft or a scheduled post; \`publish_at\` moves a scheduled post. Nothing can be edited from 10 minutes before it goes out, and published or failed posts can't be edited.
- \`schedule_post\` with a scheduled post's \`post_id\` and \`publish_now: true\` publishes it now. Confirm first.
- \`mcp__juzpost__delete_post\` deletes a post in any status (a scheduled post's timer is cancelled). Confirm first. It never removes anything already published on a platform.
- For a failed post, \`get_post\` gives each account's error; explain it in plain words.

## Workspaces and limits

- \`mcp__juzpost__list_workspaces\` lists every workspace with \`access\`; \`mcp__juzpost__switch_workspace\` moves the connection. Confirm the workspace with the user first.
- A workspace can create 30 posts per hour through a connector. How far ahead a post can be scheduled is \`limits.scheduleAheadDays\` in \`get_context\`.
- An access message with a link means this workspace doesn't include the action: pass it on as it is.
`
