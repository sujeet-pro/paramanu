import type { Meta, StoryObj } from "@storybook/react"
import { ThemeProvider, useTheme } from "./theme-provider.js"

function ThemeDisplay() {
  const { mode, setMode } = useTheme()
  return (
    <div style={{ padding: "16px" }}>
      <p>Current theme: {mode}</p>
      <button type="button" onClick={() => setMode("light")}>
        Light
      </button>
      <button type="button" onClick={() => setMode("dark")}>
        Dark
      </button>
      <button type="button" onClick={() => setMode("system")}>
        System
      </button>
    </div>
  )
}

const meta = {
  title: "Utilities/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  argTypes: {
    defaultMode: {
      control: "select",
      options: ["light", "dark", "system"],
    },
  },
  args: {
    defaultMode: "system",
    children: <ThemeDisplay />,
  },
} satisfies Meta<typeof ThemeProvider>

export default meta
type Story = StoryObj<typeof ThemeProvider>

export const Playground: Story = {}

export const DarkDefault: Story = {
  args: { defaultMode: "dark" },
}
