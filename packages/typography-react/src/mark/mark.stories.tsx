import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Mark } from "./mark.js"

const meta = {
  title: "Typography/Mark",
  tags: ["autodocs", "stable"],
  component: Mark,
  argTypes: {
    variant: { control: "select", options: ["default", "underline", "circle", "filled"] },
    color: { control: "select", options: ["yellow", "primary", "danger", "success", "info"] },
  },
  args: {},
} satisfies Meta<typeof Mark>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <p>
      This text has a <Mark {...args}>marked word</Mark> in it.
    </p>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {(["default", "underline", "circle", "filled"] as const).map((v) => (
        <Mark key={v} variant={v}>
          {v}
        </Mark>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["yellow", "primary", "danger", "success", "info"] as const).map((c) => (
        <Mark key={c} color={c}>
          {c}
        </Mark>
      ))}
    </div>
  ),
}

export const Underline: Story = {
  args: { variant: "underline", color: "primary" },
  render: (args) => <Mark {...args}>underlined mark</Mark>,
}

export const Filled: Story = {
  args: { variant: "filled", color: "danger" },
  render: (args) => <Mark {...args}>filled mark</Mark>,
}

export const Circle: Story = {
  args: { variant: "circle" },
  render: (args) => <Mark {...args}>circled mark</Mark>,
}

export const ColorDanger: Story = {
  args: { color: "danger" },
  render: (args) => <Mark {...args}>danger mark</Mark>,
}

export const ColorSuccess: Story = {
  args: { color: "success" },
  render: (args) => <Mark {...args}>success mark</Mark>,
}

export const ColorInfo: Story = {
  args: { color: "info" },
  render: (args) => <Mark {...args}>info mark</Mark>,
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => <Mark {...args}>hover mark</Mark>,
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => <Mark {...args}>focus visible mark</Mark>,
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => <Mark>semantic mark element</Mark>,
  play: async ({ canvasElement }) => {
    const mark = canvasElement.querySelector("mark")
    await expect(mark).toBeTruthy()
  },
}
