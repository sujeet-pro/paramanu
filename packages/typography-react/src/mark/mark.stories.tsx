import type { Meta, StoryObj } from "@storybook/react"
import { Mark } from "./mark.js"

const meta = {
  title: "Typography/Mark",
  tags: ["autodocs"],
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
