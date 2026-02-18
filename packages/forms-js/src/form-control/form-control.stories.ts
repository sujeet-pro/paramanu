import type { Meta, StoryObj } from "@storybook/html"
import { formControlClasses } from "./form-control.classes.js"
import type { FormControlClassesOptions } from "./form-control.types.js"

type FormControlArgs = FormControlClassesOptions

function createFormControl(args: FormControlArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = formControlClasses(args)
  el.role = "group"
  el.textContent = "Form control content"
  return el
}

const meta = {
  title: "Forms/Form Control",
  tags: ["autodocs"],
  render: (args) => createFormControl(args as FormControlArgs),
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: { orientation: "vertical" },
} satisfies Meta<FormControlArgs>

export default meta
type Story = StoryObj<FormControlArgs>

export const Playground: Story = {}
export const Horizontal: Story = { args: { orientation: "horizontal" } }
export const Invalid: Story = { args: { invalid: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Required: Story = { args: { required: true } }
