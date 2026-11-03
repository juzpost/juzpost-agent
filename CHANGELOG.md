# Changelog

## 0.4.1 (2026-11-03)

- The DeepSeek Harness plugin moved to its own repository, [juzpost/dsh-juzpost](https://github.com/juzpost/dsh-juzpost); this repository no longer carries any code that reads a credential.
- `privacyPolicyUrl` set in the Claude plugin manifest.

## 0.4.0 (2026-11-03)

- One repository for every agent: Gemini CLI extension (`gemini-extension.json`), Cursor plugin (`.cursor-plugin/`, `mcp.json`), Grok Build plugin (`.grok-plugin/`), Qwen Code and the `skills` CLI install from the same skills.
- `plugins/dsh-juzpost`: a DeepSeek Harness plugin (npm `dsh-juzpost`) that connects the agent to the JuzPost MCP server with an API key and registers the posting workflow as a skill.
- `clawhub/juzpost`: an OpenClaw skill that drives `juzpost-cli`, published on ClawHub as `@juzpost/juzpost`.
- README has an install section per agent.

## 0.3.0 (2026-10-12)

- Attaching media in chat goes through `upload_file`: the user picks the files in JuzPost's upload card, so nothing on claude.ai has to be allowed. `upload_media` is for public links, `create_upload_url` for Claude Code.

## 0.2.0 (2026-10-08)

- `setup` tells Claude how to reconnect a JuzPost connector that is added but signed out, on claude.ai, the apps and Claude Code, and how to answer "what can JuzPost do".
- Scheduling follows the current tools: one `schedule_post` call, `blog` posts, per-account text, media, times and platform settings, and editing or retiming scheduled posts.
- Access refusals are passed on as JuzPost sends them; the skills, commands and descriptions no longer list plans or prices.

## 0.1.1 (2026-09-28)

- Facebook and WordPress listed as supported networks.
- Plugin icon added for the directory listing.

## 0.1.0 (2026-09-13)

- First release.
- Connects Claude to the JuzPost MCP server at `https://www.juzpost.com/mcp`.
- Skills: `setup` (connect and troubleshoot) and `social-media-scheduler` (draft, confirm, schedule, report).
- Commands: `/juzpost:post` and `/juzpost:queue`.
