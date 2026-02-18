import type { Meta, StoryObj } from "@storybook/html-vite"
import { backdropClasses } from "./backdrop.classes.js"
import type { BackdropClassesOptions } from "./backdrop.types.js"

function createBackdrop(args: BackdropClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.position = "relative"
  wrapper.style.width = "100%"
  wrapper.style.height = "200px"

  const backdrop = document.createElement("div")
  backdrop.className = backdropClasses(args)
  backdrop.setAttribute("aria-hidden", "true")
  wrapper.appendChild(backdrop)

  return wrapper
}

const meta = {
  title: "Overlays/Backdrop",
  tags: ["autodocs", "stable"],
  render: (args) => createBackdrop(args as BackdropClassesOptions),
  argTypes: {
    variant: { control: "select", options: ["default", "transparent", "blur"] },
    visible: { control: "boolean" },
  },
  args: { variant: "default", visible: true },
} satisfies Meta<BackdropClassesOptions>

export default meta
type Story = StoryObj<BackdropClassesOptions>

export const Playground: Story = {}
export const Blur: Story = { args: { variant: "blur" } }
export const Transparent: Story = { args: { variant: "transparent" } }
export const Hidden: Story = { args: { visible: false } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
