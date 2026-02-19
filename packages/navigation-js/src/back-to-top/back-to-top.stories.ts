import type { Meta, StoryObj } from "@storybook/html-vite"
import { bttClasses } from "./back-to-top.classes.js"
import type { BttClassesOptions } from "./back-to-top.types.js"

interface BttArgs extends BttClassesOptions {}

function createBtt(args: BttArgs): HTMLElement {
  const btn = document.createElement("button")
  btn.className = bttClasses(args)
  btn.type = "button"
  btn.setAttribute("aria-label", "Back to top")
  btn.textContent = "\u2191"
  return btn
}

const meta = {
  title: "Navigation/Back to Top",
  tags: ["autodocs", "beta"],
  render: (args) => createBtt(args as BttArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "bottom-center"],
    },
    visible: { control: "boolean" },
  },
  args: {
    size: "md",
    position: "bottom-right",
    visible: true,
  },
} satisfies Meta<BttArgs>

export default meta
type Story = StoryObj<BttArgs>

export const Playground: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const BottomLeft: Story = {
  args: { position: "bottom-left" },
}

export const BottomCenter: Story = {
  args: { position: "bottom-center" },
}

export const Hidden: Story = {
  args: { visible: false },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
