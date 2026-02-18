import type { Meta, StoryObj } from "@storybook/html"
import { buttonGroupClasses, buttonClasses } from "@paramanu/buttons-js"
import type { ButtonGroupClassesOptions, ButtonVariant } from "@paramanu/buttons-js"

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
  })
  group.setAttribute("role", "group")
  group.setAttribute("aria-label", args.ariaLabel)

  for (let i = 0; i < args.buttonCount; i++) {
    const button = document.createElement("button")
    button.className = buttonClasses({ variant: args.buttonVariant })
    button.textContent = `Button ${i + 1}`
    button.type = "button"
    group.appendChild(button)
  }

  return group
}

const meta = {
  title: "Components/ButtonGroup",
  render: (args) => createButtonGroup(args as ButtonGroupArgs),
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    attached: { control: "boolean" },
    buttonCount: { control: { type: "number", min: 2, max: 6 } },
    buttonVariant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
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

export const Default: Story = {}

export const Attached: Story = {
  args: {
    attached: true,
  },
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
}

export const VerticalAttached: Story = {
  args: {
    orientation: "vertical",
    attached: true,
  },
}

export const PrimaryButtons: Story = {
  args: {
    buttonVariant: "primary",
    attached: true,
  },
}

export const TwoButtons: Story = {
  args: {
    buttonCount: 2,
    attached: true,
  },
}
