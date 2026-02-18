import type { Meta, StoryObj } from "@storybook/html"
import { buttonGroupClasses } from "./button-group.classes.js"
import { buttonClasses } from "../button/button.classes.js"
import type { ButtonGroupClassesOptions, ButtonGroupOrientation } from "./button-group.types.js"
import type { ButtonVariant } from "../button/button.types.js"

interface ButtonGroupArgs extends ButtonGroupClassesOptions {
  buttonCount: number
  buttonVariant: ButtonVariant
  ariaLabel: string
}

function createButtonGroup(args: ButtonGroupArgs): HTMLDivElement {
  const group = document.createElement("div")
  group.className = buttonGroupClasses({
    orientation: args.orientation,
    attached: args.attached,
    fullWidth: args.fullWidth,
  })
  group.setAttribute("role", "group")
  group.setAttribute("aria-label", args.ariaLabel)

  const labels = ["Left", "Center", "Right", "Fourth", "Fifth", "Sixth"]
  for (let i = 0; i < args.buttonCount; i++) {
    const button = document.createElement("button")
    button.className = buttonClasses({ variant: args.buttonVariant })
    button.textContent = labels[i] ?? `Button ${i + 1}`
    button.type = "button"
    group.appendChild(button)
  }

  return group
}

const meta = {
  title: "Buttons/Button Group",
  tags: ["autodocs"],
  render: (args) => createButtonGroup(args as ButtonGroupArgs),
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    attached: { control: "boolean" },
    fullWidth: { control: "boolean" },
    buttonCount: { control: { type: "number", min: 2, max: 6 } },
    buttonVariant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "outline"],
    },
    ariaLabel: { control: "text" },
  },
  args: {
    orientation: "horizontal",
    attached: false,
    buttonCount: 3,
    buttonVariant: "secondary",
    ariaLabel: "Actions",
  },
} satisfies Meta<ButtonGroupArgs>

export default meta
type Story = StoryObj<ButtonGroupArgs>

export const Playground: Story = {}

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
}

export const Attached: Story = {
  args: { attached: true },
}

export const VerticalAttached: Story = {
  args: { orientation: "vertical", attached: true },
}

export const FullWidth: Story = {
  args: { fullWidth: true },
}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"

    const orientations: ButtonGroupOrientation[] = ["horizontal", "vertical"]
    for (const orientation of orientations) {
      const label = document.createElement("p")
      label.textContent = `${orientation} / attached`
      container.appendChild(label)
      container.appendChild(
        createButtonGroup({
          orientation,
          attached: true,
          buttonCount: 3,
          buttonVariant: "primary",
          ariaLabel: `${orientation} group`,
        }),
      )
    }
    return container
  },
}

export const MixedVariants: Story = {
  render: () => {
    const group = document.createElement("div")
    group.className = buttonGroupClasses({})
    group.setAttribute("role", "group")
    group.setAttribute("aria-label", "Mixed actions")

    const variants: ButtonVariant[] = ["primary", "secondary", "danger"]
    const labels = ["Save", "Cancel", "Delete"]
    for (let i = 0; i < variants.length; i++) {
      const button = document.createElement("button")
      button.className = buttonClasses({ variant: variants[i] })
      button.textContent = labels[i]
      button.type = "button"
      group.appendChild(button)
    }
    return group
  },
}

export const TwoButtons: Story = {
  args: { buttonCount: 2, attached: true },
}
