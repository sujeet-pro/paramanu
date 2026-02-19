import type { Meta, StoryObj } from "@storybook/html-vite"
import { nativeSelClasses } from "./native-select.classes.js"
import type { NativeSelClassesOptions } from "./native-select.types.js"

type NativeSelArgs = NativeSelClassesOptions

function createNativeSel(args: NativeSelArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = nativeSelClasses(args)

  const select = document.createElement("select")
  select.className = "pm-native-sel__field"
  if (args.disabled) { select.disabled = true; select.setAttribute("aria-disabled", "true") }
  if (args.invalid) select.setAttribute("aria-invalid", "true")

  const options = [["", "Select..."], ["apple", "Apple"], ["banana", "Banana"], ["cherry", "Cherry"]]
  options.forEach(([value, text]) => {
    const opt = document.createElement("option")
    opt.value = value
    opt.textContent = text
    select.appendChild(opt)
  })

  const arrow = document.createElement("span")
  arrow.className = "pm-native-sel__arrow"
  arrow.setAttribute("aria-hidden", "true")
  arrow.innerHTML = "&#9662;"

  wrapper.appendChild(select)
  wrapper.appendChild(arrow)
  return wrapper
}

const meta = {
  title: "Forms/Native Select",
  tags: ["autodocs", "beta"],
  render: (args) => createNativeSel(args as NativeSelArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: { variant: "outline", size: "md" },
} satisfies Meta<NativeSelArgs>

export default meta
type Story = StoryObj<NativeSelArgs>

export const Playground: Story = {}
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraSmall: Story = { args: { size: "xs" } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
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
