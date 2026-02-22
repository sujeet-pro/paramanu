import type { Meta, StoryObj } from "@storybook/html-vite"
import { selectClasses } from "./select.classes.js"
import type { SelectClassesOptions } from "./select.types.js"

type SelectArgs = SelectClassesOptions & { placeholder: string }

function createSelect(args: SelectArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = selectClasses(args)

  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.className = "pm-select__trigger"
  trigger.setAttribute("role", "combobox")
  trigger.setAttribute("aria-expanded", String(args.open || false))
  trigger.setAttribute("aria-haspopup", "listbox")
  trigger.textContent = args.placeholder || "Select..."
  if (args.disabled) {
    trigger.disabled = true
    trigger.setAttribute("aria-disabled", "true")
  }
  if (args.invalid) trigger.setAttribute("aria-invalid", "true")

  const listbox = document.createElement("div")
  listbox.className = "pm-select__listbox"
  listbox.setAttribute("role", "listbox")
  ;["Apple", "Banana", "Cherry"].forEach((opt) => {
    const option = document.createElement("div")
    option.setAttribute("role", "option")
    option.textContent = opt
    listbox.appendChild(option)
  })

  wrapper.appendChild(trigger)
  wrapper.appendChild(listbox)
  return wrapper
}

const meta = {
  title: "Forms/Select",
  tags: ["autodocs", "beta"],
  render: (args) => createSelect(args as SelectArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { variant: "outline", size: "md", placeholder: "Select an option..." },
} satisfies Meta<SelectArgs>

export default meta
type Story = StoryObj<SelectArgs>

export const Playground: Story = {}
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraSmall: Story = { args: { size: "xs" } }
export const FullWidth: Story = { args: { fullWidth: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
