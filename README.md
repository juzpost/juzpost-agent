# JuzPost for AI agents: social media scheduler with MCP and CLI

**JuzPost is a free social media scheduler for YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress.** This repository connects it to Claude Code, Claude Cowork, Cursor, Gemini CLI, Qwen Code, Grok Build, OpenClaw, DeepSeek Harness and any other agent that speaks MCP, so you can draft, schedule and publish posts by asking your agent. Every paid plan includes full access from Claude plus the [JuzPost CLI](https://github.com/juzpost/juzpost-cli).

One upload, every platform, and a clear report of what went out.

- **9 networks from one brief.** Short-form video, images and text posts.
- **Your agent asks before it publishes.** You see the caption, accounts and time first.
- **Your own accounts, your own sign-in.** No API keys to paste; revoke access anytime.
- **Scriptable too.** The same account works from the terminal with `juzpost-cli`.

## Install

### Claude Code (plugin)

```text
/plugin marketplace add juzpost/juzpost-agent
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

### Cursor

Open Customize in the Cursor sidebar, find JuzPost in the marketplace and select Install. The plugin registers the JuzPost MCP server and the two skills; the first tool call opens a browser to sign in.

For local development, clone this repository and symlink it into `~/.cursor/plugins/local/juzpost`, then run Developer: Reload Window.

### Gemini CLI

```bash
gemini extensions install https://github.com/juzpost/juzpost-agent
```

The extension registers the JuzPost MCP server and the skills. On first use Gemini CLI opens a browser to sign in to JuzPost; run `/mcp auth juzpost` to sign in again. Without the extension, `gemini mcp add --transport http juzpost https://www.juzpost.com/mcp` registers the server alone.

### Qwen Code

```bash
qwen extensions install juzpost/juzpost-agent:juzpost
```

### Grok Build

Install JuzPost from the xAI plugin marketplace inside Grok Build, or add this repository as a marketplace source:

```text
grok plugin marketplace add juzpost/juzpost-agent
```

### Codex, OpenAI dots and other skill-based agents

```bash
npx skills add juzpost/juzpost-agent
```

Installs the `setup` and `social-media-scheduler` skills into the agent's skills directory. Add the MCP server to the agent with the URL `https://www.juzpost.com/mcp`.

### OpenClaw

```bash
openclaw skills install @juzpost/juzpost
```

The OpenClaw skill drives the [JuzPost CLI](https://github.com/juzpost/juzpost-cli) (`npm install -g juzpost-cli`, then `juzpost auth login`).

### DeepSeek Harness

```bash
dsh plugin --profile web add dsh-juzpost
```

Create an API key in JuzPost under Settings → API keys, export it as `JUZPOST_API_KEY`, and restart `dsh web`. Details in [plugins/dsh-juzpost](./plugins/dsh-juzpost).

### Any other MCP client

Add a streamable HTTP MCP server with the URL `https://www.juzpost.com/mcp`. It signs you in with OAuth (dynamic client registration, PKCE) on first use, or takes a JuzPost API key as a Bearer token.

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

## Plans

See the [pricing page](https://www.juzpost.com/pricing) for prices and current details.

| | Free | Solo | Growth | Pro |
|---|---|---|---|---|
| Social accounts | 2 | 5 | 15 | 50 |
| Workspaces | 1 | 1 | 2 | 5 |
| Team members | | | Up to 50 | Up to 50 |
| Posts | 15 queued at a time | Unlimited | Unlimited | Unlimited |
| Schedule ahead | 30 days | 180 days | 180 days | 180 days |
| Networks | All except X | All 9 | All 9 | All 9 |
| Claude and AI agents (MCP) | | Yes: upload, draft, schedule, publish | Yes | Yes |
| REST API and command line (CLI) | | Yes | Yes | Yes |

Paid plans include a 7-day free trial.

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
Yes. The Free plan schedules posts to 2 accounts on every network except X, and it is never charged. Using JuzPost from Claude or other AI agents starts with Solo.

**Which plan do I need to post from an agent?**
Any paid plan: Solo, Growth or Pro. Each one lets the agent upload media, create drafts, schedule and publish.

**Does Claude publish without asking?**
The plugin's skills tell Claude to show you the post, accounts and time and to wait for your confirmation. Claude also asks your permission before running tools that publish or schedule.

**What does JuzPost store when I connect Claude?**
The connection, its permissions and workspace, and the posts you create. JuzPost receives the requests Claude sends to act, not your conversation. Details: [privacy policy](https://www.juzpost.com/privacy-policy).

**How do I disconnect?**
In JuzPost, go to Settings, Connections and revoke the connection. To remove the plugin in Claude Code, run `/plugin uninstall juzpost@juzpost-agent`; in Gemini CLI, `gemini extensions uninstall juzpost`; in Cursor, remove it from Customize.

**I'm moving from another scheduler. What changes?**
If you've used Buffer, Hootsuite or Later, the calendar and queue will feel familiar. JuzPost adds Claude and a CLI on the same account.

## Links

- Website: [juzpost.com](https://www.juzpost.com)
- Pricing: [juzpost.com/pricing](https://www.juzpost.com/pricing)
- Tool reference: [api.juzpost.com/docs](https://api.juzpost.com/docs)
- CLI: [juzpost-cli](https://github.com/juzpost/juzpost-cli)
- Privacy policy: [juzpost.com/privacy-policy](https://www.juzpost.com/privacy-policy)
- Terms: [juzpost.com/terms-of-service](https://www.juzpost.com/terms-of-service)
- Support: [support@juzpost.com](mailto:support@juzpost.com) or [juzpost.com/support](https://www.juzpost.com/support)

## License

MIT. See [LICENSE](./LICENSE).
