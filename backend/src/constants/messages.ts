export const Messages = {
  // token's message
  TOKEN_BLOCKED: 'Token is blocked.',
  TOKEN_EXPIRED: 'Token is expired',
  TOKEN_NOT_FOUND: 'Token not Found',
  TOKEN_TYPE_INVALID: 'Token type is invalid',
  TOKEN_INVALID: 'Token is invalid/maybe expired',
  TOKEN_USER_INVALID: 'Token contained no recognizable user identification',
  // user's message
  USER_ID_INVALID: 'User id invalid.',
  USER_NOT_FOUND: 'User account not found',
  USER_IS_BLOCKED: 'User account is blocked',
  USER_NOT_VERIFIED: 'User account is not verified',
  USER_NOT_REGISTER: 'User account is not registered',
  USER_ALREADY_REGISTER: 'User account already registered',
  USER_LOGOUT_SUCCESSFULLY: 'User logout successfully',
  USER_ALREADY_VERIFIED: 'already verified.',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_OTP: 'Given otp invalid.',
  // category
  CATEGORY_NOT_EXISTS: 'Category not exists with slug',
  CATEGORY_ALREADY_EXISTS: 'Category already exists same name',
} as const;
