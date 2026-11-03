import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DEFAULT_BASE_URL, resolveConnection } from '../lib/index.js'

test('defaults to the hosted MCP endpoint with no key', () => {
  const c = resolveConnection({}, {})
  assert.equal(c.url, `${DEFAULT_BASE_URL}/mcp`)
  assert.deepEqual(c.headers, {})
  assert.equal(c.configured, false)
  assert.equal(c.source, 'none')
})

test('reads the key from the configured env var', () => {
  const c = resolveConnection({ apiKeyEnv: 'MY_KEY' }, { MY_KEY: 'jp_live_abc' })
  assert.deepEqual(c.headers, { Authorization: 'Bearer jp_live_abc' })
  assert.equal(c.configured, true)
  assert.equal(c.source, 'env.MY_KEY')
})

test('inline key wins over the env var and baseUrl keeps one /mcp', () => {
  const c = resolveConnection({ apiKey: 'inline', baseUrl: 'https://example.test/mcp/' }, { JUZPOST_API_KEY: 'env' })
  assert.equal(c.url, 'https://example.test/mcp')
  assert.equal(c.headers.Authorization, 'Bearer inline')
  assert.equal(c.source, 'config.apiKey')
})
