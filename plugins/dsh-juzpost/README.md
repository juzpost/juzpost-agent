# dsh-juzpost

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin that connects the agent to [JuzPost](https://www.juzpost.com), a free social media scheduler with low-cost paid plans, over MCP. The agent can list your connected social accounts, check platform limits, upload media, and draft, schedule or publish posts to YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress.

## Install

```bash
# from npm
dsh plugin --profile web add dsh-juzpost

# or straight from the repository
dsh plugin --profile web add "github:juzpost/juzpost-agent#path:/plugins/dsh-juzpost"
```

Then:

1. In JuzPost, open Settings → API keys and create a key (any paid plan).
2. Export it as `JUZPOST_API_KEY` in your shell, or add it to `$DSH_HOME/.env`.
3. Start `dsh web` (restart the profile after installing) and ask the agent to list your connected accounts.

## Configuration

Override the `juzpost` row in `$DSH_HOME/profiles/web/cordis.patch.yml`:

```yaml
- id: juzpost
  config:
    apiKeyEnv: JUZPOST_API_KEY   # env var holding the key
    # apiKey: jp_live_...        # inline key, discouraged
    baseUrl: https://www.juzpost.com
    skill: true                  # register the `juzpost` workflow skill
```

Without a key the `juzpost` row logs a warning and the `juzpost-mcp` row registers no tools; dsh still boots.

## What it registers

- `juzpost`: a service with the MCP endpoint URL and `Authorization` header, read by the `juzpost-mcp` row.
- `juzpost-mcp`: one `@deepseek-ai/dsh-mcp-client` instance exposing the JuzPost tools as `mcp__juzpost__*`.
- `juzpost` skill: the posting workflow (check the workspace, pick accounts, check limits, confirm with the user, schedule, report).

Tool reference: [api.juzpost.com/docs](https://api.juzpost.com/docs). Support: support@juzpost.com.

MIT.
