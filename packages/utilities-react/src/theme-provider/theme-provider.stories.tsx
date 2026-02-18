import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
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
  tags: ["autodocs", "stable"],
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

export const LightDefault: Story = {
  args: { defaultMode: "light" },
}

export const SystemDefault: Story = {
  args: { defaultMode: "system" },
}

export const RenderTest: Story = {
  args: {
    defaultMode: "light",
    children: <div>Test content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}
