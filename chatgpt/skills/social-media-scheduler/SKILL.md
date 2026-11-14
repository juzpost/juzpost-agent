---
name: social-media-scheduler
description: Draft, schedule and publish social media posts to YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress with JuzPost, confirming with the user before anything is published.
---

# Scheduling posts with JuzPost

The user's explicit instructions take priority over this skill. Never schedule, publish or delete without the user's go-ahead in this conversation.

## The flow

1. **Check the connection.** Call `get_context` for the workspace, timezone and anything blocked.
2. **Pick the accounts.** Call `list_accounts` for account ids, platforms and health. If the user names a group ("my brand accounts"), call `list_groups`. Skip accounts that need reconnecting and say which ones.
3. **Check the fit.** For captions, titles or media near a limit, call `get_platform_limits` for the platforms involved.
4. **Attach media.** For a file or a link, call `upload_media` and keep the returned `media_key`. `create_post` also takes public URLs in `media_urls`.
5. **Create the draft.** Call `create_post` with the `type` the user asked for (`text`, `image`, `video` or `blog`); if they have not said, ask. Put everything the post needs in this call, including `account_ids` and any platform settings. Pass an `idempotency_key` so a retry never creates a second draft.
   - Facebook text post with a link: set `platform_settings.facebook.link` to it (ask which one if there are several) and tell the user Facebook will show a preview card.
6. **Confirm.** Show the caption, media, accounts and time (in the workspace timezone). Do not schedule until the user agrees.
7. **Schedule or publish.** Call `schedule_post` with only `post_id` and either `publish_at` (ISO 8601 UTC, at least 10 minutes ahead) or `publish_now: true`. It schedules the draft as it was created. If the user wants a change after confirming, make it with `update_post` first, then schedule.
8. **Report.** Call `get_post` to show each account's status, and the reason for any failure.

## Existing posts

- `list_posts` filters by `status` (`draft`, `scheduled`, `published`, `failed`), account and date range.
- `update_post` edits a draft or a scheduled post, and `publish_at` moves a scheduled post to a new time. A scheduled post can no longer be edited from 10 minutes before it fires; published posts cannot be edited.
- A scheduled post cannot be cancelled or deleted from ChatGPT; the user cancels it in the JuzPost dashboard.
- `schedule_post` with a scheduled post's `post_id` and `publish_now: true` publishes it now instead of at its time. Confirm with the user first.
- `delete_post` deletes a post in any status: draft, scheduled (its timer is cancelled, so it never goes out), failed or published. Confirm with the user first; it never removes anything already published on a platform.

## Limits

- One post per `create_post` call.
- A workspace can create 30 posts per hour through a connector.
- Platform settings that need a choice (a Pinterest board, a WordPress post type) come from `list_options`.
