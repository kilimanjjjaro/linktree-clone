export const USER_ID = 'user-1'
export const OTHER_USER_ID = 'user-2'
export const TREE_ID = 'tree-1'
export const USER_EMAIL = 'ada@example.com'
export const USER_NAME = 'Ada Lovelace'
export const USER_PASSWORD = 'correct-horse'
export const OTHER_PASSWORD = 'battery-staple'
export const SHORT_PASSWORD = 'short'
export const TOKEN = 'token-1'
export const TOKEN_ID = 'token-id-1'
export const OLD_TOKEN_ID = 'token-id-0'
export const GMAIL_USER = 'linktree@example.com'
export const BASE_URL = 'http://localhost:3000'
export const TEST_BCRYPT_ROUNDS = 4
export const ONE_HOUR_MS = 3_600_000
export const SINGLE_CALL = 1
export const FIRST_CALL = 0
export const FIRST_ARGUMENT = 0
export const CLIENT_VERSION = 'test'
export const UNIQUE_CONSTRAINT_CODE = 'P2002'
export const RECORD_NOT_FOUND_CODE = 'P2025'
export const LINK_URL = 'https://example.com/'
export const LINK_IMAGE_URL = 'https://example.com/og.png'
export const UNKNOWN_ID = 999

const CLOUDINARY_UPLOAD_URL =
  'https://res.cloudinary.com/demo/image/upload/v1713570951'

export const AVATAR_PUBLIC_ID = 'linktree/links-avatar/avatar'
export const LINK_IMAGE_PUBLIC_ID = 'linktree/links-image/image'
export const BACKGROUND_PUBLIC_ID = 'linktree/tree-backgrounds/background'
export const AVATAR_ASSET_URL = `${CLOUDINARY_UPLOAD_URL}/${AVATAR_PUBLIC_ID}.png`
export const LINK_IMAGE_ASSET_URL = `${CLOUDINARY_UPLOAD_URL}/${LINK_IMAGE_PUBLIC_ID}.jpg`
export const BACKGROUND_ASSET_URL = `${CLOUDINARY_UPLOAD_URL}/${BACKGROUND_PUBLIC_ID}.webp`
export const APP_ASSET_URL = `${CLOUDINARY_UPLOAD_URL}/linktree/logo.png`
export const DEFAULT_AVATAR = '/images/default-user-avatar.svg'

export const UPLOAD_RESULT = {
  public_id: AVATAR_PUBLIC_ID,
  secure_url: AVATAR_ASSET_URL
}
