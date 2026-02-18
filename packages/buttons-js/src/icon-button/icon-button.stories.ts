import type { Meta, StoryObj } from "@storybook/html-vite"
import { iconButtonClasses } from "./icon-button.classes.js"
import type { IconButtonClassesOptions, IconButtonVariant, IconButtonSize } from "./icon-button.types.js"

interface IconButtonArgs extends IconButtonClassesOptions {
  ariaLabel: string
}

function createSearchIcon(): SVGElement {
  const ns = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(ns, "svg")
  svg.setAttribute("width", "16")
  svg.setAttribute("height", "16")
  svg.setAttribute("viewBox", "0 0 24 24")
  svg.setAttribute("fill", "none")
  svg.setAttribute("stroke", "currentColor")
  svg.setAttribute("stroke-width", "2")
  const circle = document.createElementNS(ns, "circle")
  circle.setAttribute("cx", "11")
  circle.setAttribute("cy", "11")
  circle.setAttribute("r", "8")
  const line = document.createElementNS(ns, "line")
  line.setAttribute("x1", "21")
  line.setAttribute("y1", "21")
  line.setAttribute("x2", "16.65")
  line.setAttribute("y2", "16.65")
  svg.appendChild(circle)
  svg.appendChild(line)
  return svg
}

function createIconButton(args: IconButtonArgs): HTMLButtonElement {
  const button = document.createElement("button")
  button.className = iconButtonClasses({
    variant: args.variant,
    size: args.size,
    shape: args.shape,
    disabled: args.disabled,
    loading: args.loading,
    active: args.active,
  })
  button.type = "button"
  button.setAttribute("aria-label", args.ariaLabel)
  button.appendChild(createSearchIcon())
  if (args.disabled) {
    button.disabled = true
    button.setAttribute("aria-disabled", "true")
  }
  if (args.loading) {
    button.setAttribute("aria-busy", "true")
  }
  return button
}

const meta = {
  title: "Buttons/Icon Button",
  tags: ["autodocs", "stable"],
  render: (args) => createIconButton(args as IconButtonArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["square", "circle"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    active: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
  args: {
    variant: "primary",
    size: "md",
    shape: "square",
    ariaLabel: "Search",
  },
} satisfies Meta<IconButtonArgs>

export default meta
type Story = StoryObj<IconButtonArgs>

export const Playground: Story = {}

export const Primary: Story = {
  args: { variant: "primary" },
}

export const Secondary: Story = {
  args: { variant: "secondary" },
}

export const Ghost: Story = {
  args: { variant: "ghost" },
}

export const Circle: Story = {
  args: { shape: "circle" },
}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"

    const variants: IconButtonVariant[] = ["primary", "secondary", "danger", "ghost", "outline"]
    const sizes: IconButtonSize[] = ["xs", "sm", "md", "lg", "xl"]

    for (const variant of variants) {
      const row = document.createElement("div")
      row.style.display = "flex"
      row.style.gap = "8px"
      row.style.alignItems = "center"

      for (const size of sizes) {
        row.appendChild(createIconButton({ variant, size, ariaLabel: `${variant} ${size}` }))
      }
      container.appendChild(row)
    }
    return container
  },
}

export const States: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "8px"

    container.appendChild(createIconButton({ ariaLabel: "Default" }))
    container.appendChild(createIconButton({ disabled: true, ariaLabel: "Disabled" }))
    container.appendChild(createIconButton({ loading: true, ariaLabel: "Loading" }))
    container.appendChild(createIconButton({ active: true, ariaLabel: "Active" }))
    return container
  },
}

export const Disabled: Story = {
  args: { disabled: true, ariaLabel: "Disabled" },
}

export const Loading: Story = {
  args: { loading: true, ariaLabel: "Loading" },
}

export const Active: Story = {
  args: { active: true, ariaLabel: "Active" },
}

export const Danger: Story = {
  args: { variant: "danger", ariaLabel: "Delete" },
}

export const Outline: Story = {
  args: { variant: "outline", ariaLabel: "Search" },
}

export const SquareShape: Story = {
  args: { shape: "square", ariaLabel: "Search" },
}

export const CircleShape: Story = {
  args: { shape: "circle", ariaLabel: "Search" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActivePseudo: Story = {
  parameters: { pseudo: { active: true } },
}
