import type { Meta, StoryObj } from "@storybook/html-vite"
import { formCtrlClasses } from "./form-control.classes.js"
import type { FormCtrlClassesOptions } from "./form-control.types.js"

type FormCtrlArgs = FormCtrlClassesOptions

function createFormCtrl(args: FormCtrlArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = formCtrlClasses(args)
  el.role = "group"
  el.textContent = "Form control content"
  return el
}

const meta = {
  title: "Forms/Form Control",
  tags: ["autodocs", "beta"],
  render: (args) => createFormCtrl(args as FormCtrlArgs),
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: { orientation: "vertical" },
} satisfies Meta<FormCtrlArgs>

export default meta
type Story = StoryObj<FormCtrlArgs>

export const Playground: Story = {}
export const Horizontal: Story = { args: { orientation: "horizontal" } }
export const Invalid: Story = { args: { invalid: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Required: Story = { args: { required: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
