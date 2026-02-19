import type { Meta, StoryObj } from "@storybook/html-vite"
import { toggleBtnClasses } from "./toggle-button.classes.js"
import type {
  ToggleBtnClassesOptions,
  ToggleBtnVariant,
  ToggleBtnSize,
} from "./toggle-button.types.js"

interface ToggleBtnArgs extends ToggleBtnClassesOptions {
  label: string
}

function createToggleBtn(args: ToggleBtnArgs): HTMLButtonElement {
  const button = document.createElement("button")
  button.className = toggleBtnClasses({
    variant: args.variant,
    size: args.size,
    pressed: args.pressed,
    disabled: args.disabled,
    fullWidth: args.fullWidth,
  })
  button.textContent = args.label
  button.type = "button"
  button.setAttribute("aria-pressed", String(args.pressed ?? false))
  if (args.disabled) {
    button.disabled = true
    button.setAttribute("aria-disabled", "true")
  }
  button.addEventListener("click", () => {
    const current = button.getAttribute("aria-pressed") === "true"
    button.setAttribute("aria-pressed", String(!current))
  })
  return button
}

const meta = {
  title: "Btns/Toggle Btn",
  tags: ["autodocs", "beta"],
  render: (args) => createToggleBtn(args as ToggleBtnArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Toggle",
    variant: "default",
    size: "md",
    pressed: false,
  },
} satisfies Meta<ToggleBtnArgs>

export default meta
type Story = StoryObj<ToggleBtnArgs>

export const Playground: Story = {}

export const Default: Story = {
  args: { variant: "default", label: "Default" },
}

export const Outline: Story = {
  args: { variant: "outline", label: "Outline" },
}

export const Pressed: Story = {
  args: { pressed: true, label: "Pressed" },
}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"

    const variants: ToggleBtnVariant[] = ["default", "outline"]
    const sizes: ToggleBtnSize[] = ["xs", "sm", "md", "lg", "xl"]

    for (const variant of variants) {
      const row = document.createElement("div")
      row.style.display = "flex"
      row.style.gap = "8px"
      row.style.alignItems = "center"

      for (const size of sizes) {
        row.appendChild(
          createToggleBtn({ label: `${variant} ${size}`, variant, size, pressed: true }),
        )
      }
      container.appendChild(row)
    }
    return container
  },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
}

export const States: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "8px"

    container.appendChild(createToggleBtn({ label: "Unpressed", pressed: false }))
    container.appendChild(createToggleBtn({ label: "Pressed", pressed: true }))
    container.appendChild(createToggleBtn({ label: "Disabled", disabled: true }))
    container.appendChild(
      createToggleBtn({ label: "Pressed Disabled", pressed: true, disabled: true }),
    )
    return container
  },
}

export const FullWidth: Story = {
  args: { fullWidth: true, label: "Full Width Toggle" },
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
