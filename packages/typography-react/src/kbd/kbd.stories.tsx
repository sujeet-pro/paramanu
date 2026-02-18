import type { Meta, StoryObj } from "@storybook/react"
import { Kbd } from "./kbd.js"

const meta = {
  title: "Typography/Kbd",
  tags: ["autodocs"],
  component: Kbd,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline", "subtle"] },
  },
  args: {},
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Kbd {...args}>Ctrl</Kbd>,
}

export const KeyCombination: Story = {
  render: () => (
    <p>
      Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy.
    </p>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Kbd key={s} size={s}>
          {s}
        </Kbd>
      ))}
    </div>
  ),
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <Kbd {...args}>Enter</Kbd>,
}

export const Subtle: Story = {
  args: { variant: "subtle" },
  render: (args) => <Kbd {...args}>Esc</Kbd>,
}
