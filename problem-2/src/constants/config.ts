/**
 * Application configuration constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://interview.switcheo.com",
  TIMEOUT: 10000,
} as const;

// Token Icons Configuration
export const TOKEN_ICONS_CONFIG = {
  BASE_URL:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens",
} as const;

// UI Configuration
export const UI_CONFIG = {
  SWAP_DELAY_MS: 2000, // Simulated API call delay
} as const;

// Form Validation Configuration
export const VALIDATION_CONFIG = {
  MAX_AMOUNT: 1000000,
  MIN_AMOUNT: 0,
} as const;
