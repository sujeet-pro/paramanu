import type { Meta, StoryObj } from "@storybook/react"
import { Tile } from "./tile.js"

const meta = {
  title: "Data Display/Tile",
  component: Tile,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Tile",
    variant: "outline",
    size: "md",
  },
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline Tile" },
}

export const Filled: Story = {
  args: { variant: "filled", children: "Filled Tile" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost Tile" },
}

export const Selected: Story = {
  args: { selected: true, children: "Selected Tile" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled Tile" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large" },
}
