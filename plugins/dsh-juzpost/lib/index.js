/**
 * dsh-juzpost provider plugin.
 *
 * Provides the `juzpost` service so the bundle's cordis.patch.yml can point one
 * `@deepseek-ai/dsh-mcp-client` row at the JuzPost MCP server without putting
 * the API key in configuration: the mcp-client row injects `juzpost` and reads
 * `ctx.juzpost.url` / `ctx.juzpost.headers` in its `!!js` config.
 *
 * It also registers the `juzpost` skill on `ctx.skills` (when a skills service
 * is mounted) so the agent knows the get_context → list_accounts →
 * get_platform_limits → schedule_post workflow and asks before publishing.
 *
 * Named exports only (no default export): a stray default export makes the
 * Loader collapse the namespace and drop `inject`/`apply`.
 */
import z from '@deepseek-ai/schemastery'
import { SKILL_CONTENT, SKILL_DESCRIPTION, SKILL_NAME } from './skill.js'

/** Stable Cordis plugin name. */
export const name = 'dsh-juzpost'

/** Service provided by this plugin and injected by the mcp-client row. */
export const JUZPOST_SERVICE = 'juzpost'

/** JuzPost host. The MCP endpoint is `<baseUrl>/mcp`. */
export const DEFAULT_BASE_URL = 'https://www.juzpost.com'

export const Config = z.object({
  /** Environment variable that holds the JuzPost API key. */
  apiKeyEnv: z.string().default('JUZPOST_API_KEY'),
  /** Inline API key. Prefer `apiKeyEnv`; this exists for patch-level overrides. */
  apiKey: z.string().role('secret').default(''),
  /** JuzPost host. The MCP endpoint is `<baseUrl>/mcp`. */
  baseUrl: z.string().default(DEFAULT_BASE_URL),
  /** Register the `juzpost` workflow skill on `ctx.skills`. */
  skill: z.boolean().default(true),
})

/**
 * Resolve the connection values from config and environment.
 *
 * @param {object} config - validated plugin config.
 * @param {Record<string, string | undefined>} env - environment to read the key from.
 * @returns {{ url: string, headers: Record<string, string>, configured: boolean, source: string }}
 */
export function resolveConnection(config, env = process.env) {
  const base = String(config?.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '')
  const url = base.endsWith('/mcp') ? base : `${base}/mcp`
  const envName = String(config?.apiKeyEnv || 'JUZPOST_API_KEY')
  const inline = String(config?.apiKey || '').trim()
  const fromEnv = String(env[envName] || '').trim()
  const key = inline || fromEnv
  const source = inline ? 'config.apiKey' : fromEnv ? `env.${envName}` : 'none'
  return {
    url,
    headers: key ? { Authorization: `Bearer ${key}` } : {},
    configured: key.length > 0,
    source,
  }
}

/**
 * @param {object} ctx - plugin context.
 * @param {object} config - validated plugin config.
 */
export function apply(ctx, config) {
  const cfg = Config(config ?? {})
  const conn = resolveConnection(cfg)
  const log = ctx.logger ?? console

  if (conn.configured) {
    log.info?.(`dsh-juzpost: JuzPost MCP endpoint ${conn.url} (key from ${conn.source})`)
  } else {
    log.warn?.(
      `dsh-juzpost: no JuzPost API key found. Set ${cfg.apiKeyEnv} (JuzPost → Settings → API keys, any paid plan) ` +
        `or \`apiKey\` on the \`juzpost\` row; the juzpost-mcp row will connect to ${conn.url} without credentials and register no tools.`,
    )
  }

  // Plain, unfrozen values on purpose: the mcp-client row validates the
  // interpolated `headers` with schemastery, which rejects frozen objects.
  // The getter hands every evaluation its own copy.
  ctx.provide(JUZPOST_SERVICE, {
    url: conn.url,
    get headers() {
      return { ...conn.headers }
    },
    configured: conn.configured,
  })

  if (cfg.skill) {
    ctx.inject(['skills'], (sctx) => {
      if (typeof sctx.skills?.register !== 'function') return
      sctx.skills.register({
        name: SKILL_NAME,
        description: SKILL_DESCRIPTION,
        content: SKILL_CONTENT,
        source: 'runtime',
        invocation: { modelInvocable: true, userInvocable: true },
      })
    })
  }
}
