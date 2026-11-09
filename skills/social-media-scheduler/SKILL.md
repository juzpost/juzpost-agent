---
name: social-media-scheduler
description: Draft, schedule and publish social media posts to YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress with JuzPost, confirming with the user before anything is published. Also reviews the queue, explains failed posts, and edits or reschedules posts.
---

# Scheduling posts with JuzPost

The user's explicit instructions take priority over this skill. Never schedule, publish or delete without the user's go-ahead in this conversation.

If the JuzPost tools are missing or signed out, follow the `setup` skill first. Do not bring up plans or prices; if a tool refuses with an access message, pass it on as it is.

## Schedule a post

1. **Check the connection.** Call `get_context` for the workspace, its timezone and default posting times, and `blocked[]`. If posting is blocked, pass the message on before collecting any post details.
2. **Pick the accounts.** Call `list_accounts` for account ids, platforms, usernames and health. If the user names a group ("my brand accounts"), call `list_groups`. Skip accounts with `health.status` `needs_reconnect` and say which ones. If there are no accounts, say they are connected at https://www.juzpost.com/dashboard/accounts.
3. **Get the brief.** Ask for anything missing:
   - `type`: `text`, `image`, `video` or `blog` (a WordPress blog post). Never guess it; ask if the user hasn't said.
   - `content` (the caption), and `title` where the platform has one (YouTube, Pinterest, and every blog post).
   - Media, if the type needs it.
   - The time, read in the workspace timezone, or "now".
4. **Check the fit.** For captions, titles or media near a limit, call `get_platform_limits` for the platforms involved.
5. **Platform choices.** A Pinterest account needs a board: call `list_options` with `req_type` `list_board`, ask which one, and pass it as `pinterest` keyed by account id with `board_id`. For a WordPress post type other than a blog post, use `list_post_type`. For Bluesky images or video, ask for alt text for each file and whether a content warning is needed (`bluesky`: `alt_text`, `labels`).
6. **Attach media.**
   - A file the user attached in chat or has on their device, on claude.ai, Claude Desktop or the mobile app: `upload_file`. It shows an upload card where the user picks the files; you cannot read their attachment yourself, so never pass its path anywhere. When the card says Uploaded and the user sends a message, the `media_key` of each file is in your context.
   - A public link: `upload_media` with `url`, keep the `media_key`. A public link can also go straight into `media_urls`.
   - A local file or any video in Claude Code: `create_upload_url`, then PUT the original bytes, unchanged, to `upload_url` with the returned header. Keep the `media_key`.
7. **Confirm.** Show the caption, media, each account (platform and username), any per-account differences, and the time in the workspace timezone. Wait for the user to agree.
8. **Schedule.** One `schedule_post` call creates and schedules the post: `type`, `content`, `title` if needed, `media_keys` or `media_urls`, `account_ids`, either `publish_at` (ISO 8601 UTC, at least 10 minutes ahead) or `publish_now: true`, and an `idempotency_key` so a retry never makes a second post.
   - Facebook text post with a link: set `platform_settings.facebook.link` to it (ask which one if there are several) and tell the user Facebook will show a preview card.
   - Different text per account: `account_overrides` keyed by account id (`title`, `description`, `hashtags`); one text for every account of a platform: `channel_overrides` keyed by platform id.
   - Different media or cover per account: `media_by_account`, `cover_by_account`.
   - Different time per account: `publish_at_overrides` keyed by account id.
   - Platform settings: `tiktok`, `pinterest`, `facebook`, `bluesky`, `wordpress`, each keyed by account id.
9. **Report.** Call `get_post` and show each account's status. Refer to the post by its caption or title and to accounts by platform and username, not by id.

To save a draft without scheduling, use `create_post` with the same fields, and schedule it later with `schedule_post` and only its `post_id` and the time (`publish_at` or `publish_now: true`). It schedules the draft as it was saved. To change the draft first, use `update_post`.

## Existing posts

- `list_posts` filters by `status` (`draft`, `scheduled`, `published`, `failed`), `accountId`, and `from`/`to`; `sort: "scheduledFor"` orders by publish time.
- `update_post` edits a draft or a scheduled post. `publish_at` on a scheduled post moves it to a new time. A scheduled post can no longer be edited from 10 minutes before it goes out, and published or failed posts can't be edited.
- A scheduled post can't be cancelled from Claude; the user cancels it in the JuzPost dashboard at https://www.juzpost.com/dashboard/scheduled.
- `schedule_post` with a scheduled post's `post_id` and `publish_now: true` publishes it now instead of at its time. Confirm with the user first.
- `delete_post` deletes a post in any status: draft, scheduled (its timer is cancelled, so it never goes out), failed or published. Confirm with the user first. It never removes anything already published on a platform; that stays there.
- For a failed post, `get_post` gives each account's error; explain it in plain words.

## Limits

- A workspace can create 30 posts per hour through a connector.
- How far ahead a post can be scheduled is `limits.scheduleAheadDays` in `get_context`.
