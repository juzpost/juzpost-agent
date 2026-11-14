# JuzPost plugin for ChatGPT

**Install:** [JuzPost in the ChatGPT plugin directory](https://chatgpt.com/plugins/plugin_asdk_app_6ac35f5e673c8191837b3d97fe84c761)

Schedule and publish social media posts to YouTube, Instagram, Facebook, TikTok, X, LinkedIn, Pinterest, Bluesky, Threads, Tumblr and WordPress from ChatGPT. JuzPost is a free social media scheduler with low-cost paid plans.

In ChatGPT you can see your workspace and connected accounts, check caption and media limits for each platform, upload media from a link, create and edit drafts, schedule a draft or publish it now, review your queue and see why a post failed. ChatGPT asks for your approval before anything is scheduled, published or deleted.

## What is in this folder

This is the published plugin package (Agent Plugins format):

- `plugin.json`: the manifest, with the ChatGPT listing metadata under `extensions.com.openai`.
- `mcp.json`: the JuzPost MCP server, `https://www.juzpost.com/mcp` (OAuth sign-in, no API key).
- `skills/`: `get-started` (onboarding) and `social-media-scheduler`.
- `assets/`: icon and logo.

## Use JuzPost without the plugin

Any MCP client can connect to `https://www.juzpost.com/mcp`. In ChatGPT developer mode, add it as a custom connector. See the [main README](../README.md) for Claude, Cursor, Gemini CLI and other agents.

Docs: https://api.juzpost.com/docs · Support: https://www.juzpost.com/support
