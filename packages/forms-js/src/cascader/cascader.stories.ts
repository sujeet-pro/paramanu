import type { Meta, StoryObj } from "@storybook/html"
import { cascaderClasses } from "./cascader.classes.js"
import type { CascaderClassesOptions } from "./cascader.types.js"

type CascaderArgs = CascaderClassesOptions

function createCascader(args: CascaderArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = cascaderClasses(args)
  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.className = "pm-cascader__trigger"
  trigger.textContent = "Select category..."
  trigger.setAttribute("role", "combobox")
  trigger.setAttribute("aria-expanded", String(args.open || false))
  if (args.disabled) trigger.disabled = true
  if (args.invalid) trigger.setAttribute("aria-invalid", "true")
  wrapper.appendChild(trigger)
  return wrapper
}

const meta = {
  title: "Forms/Cascader",
  tags: ["autodocs"],
  render: (args) => createCascader(args as CascaderArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: { variant: "outline", size: "md" },
} satisfies Meta<CascaderArgs>

export default meta
type Story = StoryObj<CascaderArgs>

export const Playground: Story = {}
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
