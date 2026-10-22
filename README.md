# JuzPost for Claude: social media scheduler with MCP and CLI

**JuzPost is a free social media scheduler for YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress.** This plugin connects it to Claude Code and Claude Cowork over MCP, so you can draft, schedule and publish posts by asking Claude. Every paid plan, from Solo at $19/month, includes full access from Claude plus the [JuzPost CLI](https://github.com/juzpost/juzpost-cli).

One upload, every platform, and a clear report of what went out.

- **9 networks from one brief.** Short-form video, images and text posts.
- **Claude asks before it publishes.** You see the caption, accounts and time first.
- **Your own accounts, your own sign-in.** No API keys to paste; revoke access anytime.
- **Scriptable too.** The same account works from the terminal with `juzpost-cli`.

## Install

### Claude Code (plugin)

```text
/plugin marketplace add juzpost/juzpost-claude-plugin
/plugin install juzpost@juzpost
```

The first time Claude uses a JuzPost tool, a browser window opens to sign in to JuzPost and choose a workspace.

### Cowork

Install JuzPost from the plugin directory, or add this repository as a plugin source.

### Claude Code (MCP server only)

```bash
claude mcp add --transport http juzpost https://www.juzpost.com/mcp
```

### claude.ai

Settings, Connectors, add a custom connector with the URL `https://www.juzpost.com/mcp`.

## What you can ask Claude

- "Post `./launch.mp4` to YouTube Shorts, TikTok and Instagram tomorrow at 9am with the caption 'Dark mode is here'."
- "What's scheduled for this week, and did anything fail?"
- "Will this caption fit on X and Threads?"
- "Draft a LinkedIn and Bluesky post from these release notes, show me before scheduling."
- "Move this connection to my client workspace and list its connected accounts."

The plugin also adds two commands:

| Command | What it does |
|---|---|
| `/juzpost:post <brief>` | Drafts one post, shows it to you, schedules it after you confirm |
| `/juzpost:queue [status]` | Lists scheduled, failed and draft posts and explains failures |

## Supported networks

YouTube (including Shorts), Instagram, Facebook Pages, TikTok, X (Twitter), LinkedIn, Pinterest, Bluesky, Threads, Tumblr, WordPress.

## Plans and pricing

Prices as of October 2026. See the [pricing page](https://www.juzpost.com/pricing) for current details.

| | Free | Solo | Growth | Pro |
|---|---|---|---|---|
| Price | $0 | $19/month | $29/month | $69/month |
| Social accounts | 2 | 5 | 15 | 50 |
| Workspaces | 1 | 1 | 2 | 5 |
| Team members | | | Up to 50 | Up to 50 |
| Posts | 15 queued at a time | Unlimited | Unlimited | Unlimited |
| Schedule ahead | 30 days | 180 days | 180 days | 180 days |
| Networks | All except X | All 9 | All 9 | All 9 |
| Claude and AI agents (MCP) | | Yes: upload, draft, schedule, publish | Yes | Yes |
| REST API and command line (CLI) | | Yes | Yes | Yes |

Paid plans include a 7-day free trial and a 30-day money-back guarantee.

## How it works

1. **Sign in.** The plugin points Claude at the JuzPost MCP server. JuzPost signs you in with OAuth in your browser; you choose the workspace and the permissions.
2. **Claude uses JuzPost tools.** It lists your connected accounts, checks caption limits, uploads media, creates a draft and schedules it.
3. **You confirm.** Claude shows the post, the accounts and the time before scheduling or publishing.
4. **JuzPost publishes.** Posts go out on time from JuzPost, and Claude can report the result for every account.

Full tool reference: [api.juzpost.com/docs](https://api.juzpost.com/docs).

## From the terminal

[juzpost-cli](https://github.com/juzpost/juzpost-cli) schedules and posts from your shell, cron jobs or CI, using the same JuzPost account. It works on every paid plan.

```bash
npm install -g juzpost-cli
juzpost auth login
```

## FAQ

**Is JuzPost free?**
Yes. The Free plan schedules posts to 2 accounts on every network except X, and it is never charged. Using JuzPost from Claude or other AI agents starts with Solo at $19/month.

**Which plan do I need to post from Claude?**
Any paid plan: Solo, Growth or Pro. Each one lets Claude upload media, create drafts, schedule and publish.

**Does Claude publish without asking?**
The plugin's skills tell Claude to show you the post, accounts and time and to wait for your confirmation. Claude also asks your permission before running tools that publish or schedule.

**What does JuzPost store when I connect Claude?**
The connection, its permissions and workspace, and the posts you create. JuzPost receives the requests Claude sends to act, not your conversation. Details: [privacy policy](https://www.juzpost.com/privacy-policy).

**How do I disconnect?**
In JuzPost, go to Settings, Connections and revoke the connection. To remove the plugin in Claude Code, run `/plugin uninstall juzpost@juzpost`.

**I'm moving from another scheduler. What changes?**
If you've used Buffer, Hootsuite or Later, the calendar and queue will feel familiar. JuzPost adds Claude and a CLI on the same account.

## Links

- Website: [juzpost.com](https://www.juzpost.com)
- Pricing: [juzpost.com/pricing](https://www.juzpost.com/pricing)
- Tool reference: [api.juzpost.com/docs](https://api.juzpost.com/docs)
- Privacy policy: [juzpost.com/privacy-policy](https://www.juzpost.com/privacy-policy)
- Terms: [juzpost.com/terms-of-service](https://www.juzpost.com/terms-of-service)
- Support: [support@juzpost.com](mailto:support@juzpost.com) or [juzpost.com/support](https://www.juzpost.com/support)

## License

MIT. See [LICENSE](./LICENSE).
