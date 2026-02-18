import type { Meta, StoryObj } from "@storybook/html"
import { multiSelectClasses } from "./multi-select.classes.js"
import type { MultiSelectClassesOptions } from "./multi-select.types.js"

type MultiSelectArgs = MultiSelectClassesOptions & { placeholder: string }

function createMultiSelect(args: MultiSelectArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = multiSelectClasses(args)

  const trigger = document.createElement("div")
  trigger.className = "pm-multi-select__trigger"
  trigger.setAttribute("role", "combobox")
  trigger.setAttribute("aria-expanded", String(args.open || false))
  trigger.setAttribute("aria-haspopup", "listbox")
  trigger.tabIndex = args.disabled ? -1 : 0
  trigger.textContent = args.placeholder || "Select items..."
  if (args.disabled) trigger.setAttribute("aria-disabled", "true")
  if (args.invalid) trigger.setAttribute("aria-invalid", "true")

  const listbox = document.createElement("div")
  listbox.className = "pm-multi-select__listbox"
  listbox.setAttribute("role", "listbox")
  listbox.setAttribute("aria-multiselectable", "true")
  ;["React", "Vue", "Angular"].forEach((opt) => {
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
  title: "Forms/Multi Select",
  tags: ["autodocs"],
  render: (args) => createMultiSelect(args as MultiSelectArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { variant: "outline", size: "md", placeholder: "Select items..." },
} satisfies Meta<MultiSelectArgs>

export default meta
type Story = StoryObj<MultiSelectArgs>

export const Playground: Story = {}
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
