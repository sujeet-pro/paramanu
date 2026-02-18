import { addons } from "storybook/internal/manager-api"
import { themes } from "storybook/internal/theming"
import { GLOBALS_UPDATED } from "storybook/internal/core-events"
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges/manager-helpers"

const DARK_THEMES = new Set([
  "default-dark",
  "dark-modern",
  "material-dark",
  "antd-dark",
  "bootstrap-dark",
])

addons.register("paramanu-theme-sync", (api) => {
  const channel = addons.getChannel()

  channel.on(GLOBALS_UPDATED, ({ globals }: { globals: Record<string, unknown> }) => {
    const themeKey = (globals.theme as string) || "default"
    const isDark = DARK_THEMES.has(themeKey)

    api.setOptions({
      theme: isDark
        ? { ...themes.dark, brandTitle: "Paramanu-JS" }
        : { ...themes.light, brandTitle: "Paramanu-JS" },
    })
  })
})

addons.setConfig({
  tagBadges: [
    {
      tags: "draft",
      badge: {
        text: "Draft",
        style: { backgroundColor: "#6B7280", color: "#FFFFFF" },
        tooltip: "This component is in early draft stage.",
      },
      display: { sidebar: [{ type: "component", skipInherited: false }], toolbar: true },
    },
    {
      tags: "beta",
      badge: {
        text: "Beta",
        style: { backgroundColor: "#F59E0B", color: "#000000" },
        tooltip: "This component is in beta. API may change.",
      },
      display: { sidebar: [{ type: "component", skipInherited: false }], toolbar: true },
    },
    {
      tags: "stable",
      badge: {
        text: "Stable",
        style: { backgroundColor: "#10B981", color: "#FFFFFF" },
        tooltip: "This component is stable and ready for production.",
      },
      display: { sidebar: [{ type: "component", skipInherited: false }], toolbar: true },
    },
    {
      tags: "deprecated",
      badge: {
        text: "Deprecated",
        style: { backgroundColor: "#EF4444", color: "#FFFFFF" },
        tooltip: "This component is deprecated. Migrate to the recommended alternative.",
      },
      display: { sidebar: [{ type: "component", skipInherited: false }], toolbar: true },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
})
