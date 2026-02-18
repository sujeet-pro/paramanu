import type { Meta, StoryObj } from "@storybook/html-vite"
import { comboboxClasses } from "./combobox.classes.js"
import type { ComboboxClassesOptions } from "./combobox.types.js"

type ComboboxArgs = ComboboxClassesOptions & { placeholder: string }

function createCombobox(args: ComboboxArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = comboboxClasses(args)

  const input = document.createElement("input")
  input.className = "pm-combobox__input"
  input.setAttribute("role", "combobox")
  input.setAttribute("aria-expanded", String(args.open || false))
  input.setAttribute("aria-autocomplete", "list")
  input.setAttribute("aria-haspopup", "listbox")
  input.placeholder = args.placeholder || "Search..."
  if (args.disabled) { input.disabled = true }
  if (args.invalid) input.setAttribute("aria-invalid", "true")

  const listbox = document.createElement("div")
  listbox.className = "pm-combobox__listbox"
  listbox.setAttribute("role", "listbox")
  ;["Apple", "Banana", "Cherry"].forEach((opt) => {
    const option = document.createElement("div")
    option.setAttribute("role", "option")
    option.textContent = opt
    listbox.appendChild(option)
  })

  wrapper.appendChild(input)
  wrapper.appendChild(listbox)
  return wrapper
}

const meta = {
  title: "Forms/Combobox",
  tags: ["autodocs", "stable"],
  render: (args) => createCombobox(args as ComboboxArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { variant: "outline", size: "md", placeholder: "Search..." },
} satisfies Meta<ComboboxArgs>

export default meta
type Story = StoryObj<ComboboxArgs>

export const Playground: Story = {}
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
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
