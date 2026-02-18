import type { Meta, StoryObj } from "@storybook/html"
import { nativeSelectClasses } from "./native-select.classes.js"
import type { NativeSelectClassesOptions } from "./native-select.types.js"

type NativeSelectArgs = NativeSelectClassesOptions

function createNativeSelect(args: NativeSelectArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = nativeSelectClasses(args)

  const select = document.createElement("select")
  select.className = "pm-native-select__field"
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
  arrow.className = "pm-native-select__arrow"
  arrow.setAttribute("aria-hidden", "true")
  arrow.innerHTML = "&#9662;"

  wrapper.appendChild(select)
  wrapper.appendChild(arrow)
  return wrapper
}

const meta = {
  title: "Forms/Native Select",
  tags: ["autodocs"],
  render: (args) => createNativeSelect(args as NativeSelectArgs),
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: { variant: "outline", size: "md" },
} satisfies Meta<NativeSelectArgs>

export default meta
type Story = StoryObj<NativeSelectArgs>

export const Playground: Story = {}
export const Filled: Story = { args: { variant: "filled" } }
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const FullWidth: Story = { args: { fullWidth: true } }
