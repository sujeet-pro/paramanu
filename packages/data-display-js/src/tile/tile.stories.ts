import type { Meta, StoryObj } from "@storybook/html-vite"
import { tileClasses } from "./tile.classes.js"
import type { TileClassesOptions } from "./tile.types.js"

interface TileArgs extends TileClassesOptions {
  label: string
}

function createTile(args: TileArgs): HTMLButtonElement {
  const btn = document.createElement("button")
  btn.className = tileClasses({
    variant: args.variant,
    size: args.size,
    selected: args.selected,
    disabled: args.disabled,
  })
  btn.type = "button"
  btn.textContent = args.label
  if (args.disabled) {
    btn.disabled = true
    btn.setAttribute("aria-disabled", "true")
  }
  if (args.selected) {
    btn.setAttribute("aria-selected", "true")
  }
  return btn
}

const meta = {
  title: "Data Display/Tile",
  tags: ["autodocs", "beta"],
  render: (args) => createTile(args as TileArgs),
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
    label: { control: "text" },
  },
  args: {
    label: "Tile",
    variant: "outline",
    size: "md",
  },
} satisfies Meta<TileArgs>

export default meta
type Story = StoryObj<TileArgs>

export const Playground: Story = {}

export const Outline: Story = { args: { variant: "outline", label: "Outline Tile" } }
export const Filled: Story = { args: { variant: "filled", label: "Filled Tile" } }
export const Ghost: Story = { args: { variant: "ghost", label: "Ghost Tile" } }
export const Selected: Story = { args: { selected: true, label: "Selected" } }
export const Disabled: Story = { args: { disabled: true, label: "Disabled" } }
export const Small: Story = { args: { size: "sm", label: "Small" } }
export const Large: Story = { args: { size: "lg", label: "Large" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
