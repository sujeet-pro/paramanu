import type { Meta, StoryObj } from "@storybook/html-vite"
import { fabClasses } from "./fab.classes.js"
import type { FabClassesOptions, FabSize } from "./fab.types.js"

interface FabArgs extends FabClassesOptions {
  ariaLabel: string
}

function createFab(args: FabArgs): HTMLButtonElement {
  const button = document.createElement("button")
  button.className = fabClasses({
    size: args.size,
    position: args.position,
    extended: args.extended,
    disabled: args.disabled,
  })
  button.type = "button"
  button.setAttribute("aria-label", args.ariaLabel)
  button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
  if (args.disabled) {
    button.disabled = true
    button.setAttribute("aria-disabled", "true")
  }
  return button
}

const meta = {
  title: "Buttons/FAB",
  tags: ["autodocs", "stable"],
  render: (args) => {
    const wrapper = document.createElement("div")
    wrapper.style.position = "relative"
    wrapper.style.height = "200px"
    wrapper.style.border = "1px dashed #ccc"
    wrapper.appendChild(createFab(args as FabArgs))
    return wrapper
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "bottom-center"],
    },
    extended: { control: "boolean" },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
  args: {
    size: "md",
    position: "bottom-right",
    ariaLabel: "Add item",
  },
} satisfies Meta<FabArgs>

export default meta
type Story = StoryObj<FabArgs>

export const Playground: Story = {}

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "16px"
    container.style.alignItems = "center"

    const sizes: FabSize[] = ["sm", "md", "lg"]
    for (const size of sizes) {
      const fab = createFab({ size, ariaLabel: `Add ${size}` })
      fab.style.position = "static"
      container.appendChild(fab)
    }
    return container
  },
}

export const Extended: Story = {
  render: () => {
    const fab = createFab({ extended: true, ariaLabel: "Add item" })
    fab.style.position = "static"
    fab.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Item`
    return fab
  },
}

export const Disabled: Story = {
  args: { disabled: true, ariaLabel: "Disabled" },
}

export const BottomLeft: Story = {
  args: { position: "bottom-left" },
}

export const BottomCenter: Story = {
  args: { position: "bottom-center" },
}

export const SmallSize: Story = {
  args: { size: "sm", ariaLabel: "Add small" },
}

export const MediumSize: Story = {
  args: { size: "md", ariaLabel: "Add medium" },
}

export const LargeSize: Story = {
  args: { size: "lg", ariaLabel: "Add large" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
