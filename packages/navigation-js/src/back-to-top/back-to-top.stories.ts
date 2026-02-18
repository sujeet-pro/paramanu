import type { Meta, StoryObj } from "@storybook/html-vite"
import { backToTopClasses } from "./back-to-top.classes.js"
import type { BackToTopClassesOptions } from "./back-to-top.types.js"

interface BackToTopArgs extends BackToTopClassesOptions {}

function createBackToTop(args: BackToTopArgs): HTMLElement {
  const btn = document.createElement("button")
  btn.className = backToTopClasses(args)
  btn.type = "button"
  btn.setAttribute("aria-label", "Back to top")
  btn.textContent = "\u2191"
  return btn
}

const meta = {
  title: "Navigation/Back to Top",
  tags: ["autodocs", "stable"],
  render: (args) => createBackToTop(args as BackToTopArgs),
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
} satisfies Meta<BackToTopArgs>

export default meta
type Story = StoryObj<BackToTopArgs>

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
