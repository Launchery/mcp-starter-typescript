/**
 * Environment Variable Validation
 *
 * Use this module to declare and validate environment variables your MCP
 * server needs at startup. It uses a lightweight approach — no extra
 * dependencies required beyond what's already in the MCP SDK.
 *
 * Usage:
 *   1. Define your required env vars in `envSchema` below.
 *   2. Call `validateEnv()` early in your server startup (src/index.ts).
 *   3. Access validated values from `env` export.
 */

/** Define your environment variable requirements here. */
interface EnvSchema {
  /** Example: an API key your server needs. Remove or replace with your own. */
  API_KEY?: string;
  /** Example: a base URL for an external service. */
  API_BASE_URL?: string;
  /** Node environment (optional, defaults to "development"). */
  NODE_ENV?: string;
}

/** Validated environment values. Populated by `validateEnv()`. */
let env: Readonly<EnvSchema> = {};

/**
 * Validate environment variables and return the parsed config.
 *
 * - Required variables that are missing will cause the process to exit with
 *   a clear error message.
 * - Optional variables are silently skipped when absent.
 *
 * @param required - List of env var names that MUST be present.
 */
export function validateEnv(required: string[] = []): Readonly<EnvSchema> {
  const raw: Record<string, string | undefined> = {
    API_KEY: process.env.API_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
    NODE_ENV: process.env.NODE_ENV ?? "development",
  };

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
    console.error("Please set them before starting the MCP server.");
    process.exit(1);
  }

  env = Object.freeze({ ...raw } as EnvSchema);
  return env;
}

/** Access validated environment values after calling `validateEnv()`. */
export function getEnv(): Readonly<EnvSchema> {
  return env;
}
