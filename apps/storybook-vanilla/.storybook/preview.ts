import "@paramanu/tokens/css/layer-order"
import "@paramanu/tokens/css/reset"
import "@paramanu/tokens/css"
import "@paramanu/tokens/css/themes"
import "@paramanu/primitives-js/css"
import "@paramanu/typography-js/css"
import "@paramanu/buttons-js/css"
import "@paramanu/forms-js/css"
import "@paramanu/navigation-js/css"
import "@paramanu/data-display-js/css"
import "@paramanu/feedback-js/css"
import "@paramanu/overlays-js/css"
import "@paramanu/disclosure-js/css"
import "@paramanu/utilities-js/css"
import { createElement, useState, useEffect } from "react"
import type { Preview } from "@storybook/html-vite"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { themes } from "storybook/theming"
import { GLOBALS_UPDATED } from "storybook/internal/core-events"

const THEME_MAP: Record<string, { className: string; colorScheme: string; dark: boolean }> = {
  default: { className: "", colorScheme: "light", dark: false },
  "default-dark": { className: "", colorScheme: "dark", dark: true },
  "light-modern": { className: "pm-theme-light-modern", colorScheme: "light", dark: false },
  "dark-modern": { className: "pm-theme-dark-modern", colorScheme: "dark", dark: true },
  material: { className: "pm-theme-material", colorScheme: "light", dark: false },
  "material-dark": { className: "pm-theme-material", colorScheme: "dark", dark: true },
  antd: { className: "pm-theme-antd", colorScheme: "light", dark: false },
  "antd-dark": { className: "pm-theme-antd", colorScheme: "dark", dark: true },
  bootstrap: { className: "pm-theme-bootstrap", colorScheme: "light", dark: false },
  "bootstrap-dark": { className: "pm-theme-bootstrap", colorScheme: "dark", dark: true },
}

const DARK_THEMES = new Set(
  Object.entries(THEME_MAP)
    .filter(([, v]) => v.dark)
    .map(([k]) => k),
)

const THEME_CLASSES = [
  ...new Set(
    Object.values(THEME_MAP)
      .map((t) => t.className)
      .filter(Boolean),
  ),
]

function getInitialThemeKey(): string {
  const params = new URLSearchParams(window.location.search)
  const globals = params.get("globals") || ""
  const match = globals.match(/theme:([^;,&]+)/)
  return match?.[1] || "default"
}

function ThemedDocsContainer(props: Record<string, unknown>) {
  const context = props.context as { channel: { on: Function; off: Function } }
  const [isDark, setIsDark] = useState(() => DARK_THEMES.has(getInitialThemeKey()))

  useEffect(() => {
    const channel = context.channel
    const handler = ({ globals }: { globals: Record<string, unknown> }) => {
      const themeKey = (globals.theme as string) || "default"
      setIsDark(DARK_THEMES.has(themeKey))
    }
    channel.on(GLOBALS_UPDATED, handler)
    return () => channel.off(GLOBALS_UPDATED, handler)
  }, [context.channel])

  return createElement(
    DocsContainer,
    { ...props, theme: isDark ? themes.dark : themes.light },
    props.children as React.ReactNode,
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Design system theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default (Light)" },
          { value: "default-dark", title: "Default (Dark)" },
          { value: "light-modern", title: "Light Modern" },
          { value: "dark-modern", title: "Dark Modern" },
          { value: "material", title: "Material (Light)" },
          { value: "material-dark", title: "Material (Dark)" },
          { value: "antd", title: "Ant Design (Light)" },
          { value: "antd-dark", title: "Ant Design (Dark)" },
          { value: "bootstrap", title: "Bootstrap (Light)" },
          { value: "bootstrap-dark", title: "Bootstrap (Dark)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "default",
  },
  parameters: {
    backgrounds: { disabled: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
        },
      },
    },
    docs: {
      container: ThemedDocsContainer,
    },
  },
  decorators: [
    (Story, context) => {
      const themeKey = (context.globals.theme as string) || "default"
      const theme = THEME_MAP[themeKey] || THEME_MAP.default

      const html = document.documentElement
      THEME_CLASSES.forEach((cls) => html.classList.remove(cls))
      if (theme.className) {
        html.classList.add(theme.className)
      }
      html.style.colorScheme = theme.colorScheme

      return Story()
    },
  ],
}

export default preview
