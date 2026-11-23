export const E2E_PORT = 3300
export const E2E_BASE_URL = `http://localhost:${E2E_PORT}`

const DESKTOP_VIEWPORT_WIDTH = 1440
const DESKTOP_VIEWPORT_HEIGHT = 900
export const DESKTOP_VIEWPORT = {
  width: DESKTOP_VIEWPORT_WIDTH,
  height: DESKTOP_VIEWPORT_HEIGHT
}

export const TEST_TIMEOUT_MS = 60_000
export const EXPECT_TIMEOUT_MS = 15_000
export const WEB_SERVER_TIMEOUT_MS = 120_000
export const CI_RETRIES = 1
export const LOCAL_RETRIES = 0

export const E2E_ENV = {
  DATABASE_URL: 'postgresql://e2e:e2e@127.0.0.1:5432/e2e',
  AUTH_SECRET: 'e2e-auth-secret',
  AUTH_TRUST_HOST: 'true'
}

export const LOCAL_TREE_KEY = '__LOCAL_TREE__'
export const LOCAL_TREE_URL = 'my-local-tree'
export const LOCAL_TREE_NAME = 'My Local Tree'
export const UNKNOWN_TREE_URL = 'a-tree-that-does-not-exist'
export const E2E_EMAIL = 'nobody@example.com'
export const E2E_PASSWORD = 'correct-horse'
export const E2E_OTHER_PASSWORD = 'battery-staple'
