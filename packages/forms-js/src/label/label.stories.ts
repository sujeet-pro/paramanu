import type { Meta, StoryObj } from "@storybook/html-vite"
import { labelClasses } from "./label.classes.js"
import type { LabelClassesOptions } from "./label.types.js"

type LabelArgs = LabelClassesOptions

function createLabel(args: LabelArgs): HTMLElement {
  const label = document.createElement("label")
  label.className = labelClasses(args)
  label.textContent = "Email address"
  if (args.required) label.setAttribute("aria-required", "true")
  return label
}

const meta = {
  title: "Forms/Label",
  tags: ["autodocs", "beta"],
  render: (args) => createLabel(args as LabelArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<LabelArgs>

export default meta
type Story = StoryObj<LabelArgs>

export const Playground: Story = {}
export const Required: Story = { args: { required: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
