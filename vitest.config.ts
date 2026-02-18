import { defineConfig } from "vitest/config"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import path from "node:path"
import { fileURLToPath } from "node:url"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    projects: [
      "packages/*",
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, "apps/storybook-react/.storybook"),
            storybookScript: "pnpm dev:sb-react -- --ci",
            storybookUrl: "http://localhost:6006",
          }),
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./apps/storybook-react/.storybook/vitest.setup.ts"],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, "apps/storybook-vanilla/.storybook"),
            storybookScript: "pnpm dev:sb-js -- --ci",
            storybookUrl: "http://localhost:6007",
          }),
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./apps/storybook-vanilla/.storybook/vitest.setup.ts"],
        },
      },
    ],
  },
})
