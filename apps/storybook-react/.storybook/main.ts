import type { StorybookConfig } from "@storybook/react-vite"
import { dirname, join } from "node:path"

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: ["../../../packages/*-react/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(config) {
    if (process.env.STORYBOOK_BASE) {
      config.base = process.env.STORYBOOK_BASE
    }
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      "@storybook/test": getAbsolutePath("@storybook/test"),
    }
    return config
  },
}

export default config
