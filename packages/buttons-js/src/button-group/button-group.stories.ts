import type { Meta, StoryObj } from "@storybook/html-vite"
import { btnGroupClasses } from "./button-group.classes.js"
import { btnClasses } from "../button/button.classes.js"
import type { BtnGroupClassesOptions, BtnGroupOrientation } from "./button-group.types.js"
import type { BtnVariant } from "../button/button.types.js"

interface BtnGroupArgs extends BtnGroupClassesOptions {
  buttonCount: number
  buttonVariant: BtnVariant
  ariaLabel: string
}

function createBtnGroup(args: BtnGroupArgs): HTMLDivElement {
  const group = document.createElement("div")
  group.className = btnGroupClasses({
    orientation: args.orientation,
    attached: args.attached,
    fullWidth: args.fullWidth,
  })
  group.setAttribute("role", "group")
  group.setAttribute("aria-label", args.ariaLabel)

  const labels = ["Left", "Center", "Right", "Fourth", "Fifth", "Sixth"]
  for (let i = 0; i < args.buttonCount; i++) {
    const button = document.createElement("button")
    button.className = btnClasses({ variant: args.buttonVariant })
    button.textContent = labels[i] ?? `Btn ${i + 1}`
    button.type = "button"
    group.appendChild(button)
  }

  return group
}

const meta = {
  title: "Btns/Btn Group",
  tags: ["autodocs", "beta"],
  render: (args) => createBtnGroup(args as BtnGroupArgs),
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
} satisfies Meta<BtnGroupArgs>

export default meta
type Story = StoryObj<BtnGroupArgs>

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

    const orientations: BtnGroupOrientation[] = ["horizontal", "vertical"]
    for (const orientation of orientations) {
      const label = document.createElement("p")
      label.textContent = `${orientation} / attached`
      container.appendChild(label)
      container.appendChild(
        createBtnGroup({
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
    group.className = btnGroupClasses({})
    group.setAttribute("role", "group")
    group.setAttribute("aria-label", "Mixed actions")

    const variants: BtnVariant[] = ["primary", "secondary", "danger"]
    const labels = ["Save", "Cancel", "Delete"]
    for (let i = 0; i < variants.length; i++) {
      const button = document.createElement("button")
      button.className = btnClasses({ variant: variants[i] })
      button.textContent = labels[i]
      button.type = "button"
      group.appendChild(button)
    }
    return group
  },
}

export const TwoBtns: Story = {
  args: { buttonCount: 2, attached: true },
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
