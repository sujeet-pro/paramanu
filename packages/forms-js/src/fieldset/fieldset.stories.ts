import type { Meta, StoryObj } from "@storybook/html"
import { fieldsetClasses } from "./fieldset.classes.js"
import type { FieldsetClassesOptions } from "./fieldset.types.js"

type FieldsetArgs = FieldsetClassesOptions & { legend?: string }

function createFieldset(args: FieldsetArgs): HTMLElement {
  const fieldset = document.createElement("fieldset")
  fieldset.className = fieldsetClasses(args)
  if (args.disabled) fieldset.disabled = true
  if (args.legend) {
    const legend = document.createElement("legend")
    legend.className = "pm-fieldset__legend"
    legend.textContent = args.legend
    fieldset.appendChild(legend)
  }
  const content = document.createElement("span")
  content.textContent = "Fieldset content"
  fieldset.appendChild(content)
  return fieldset
}

const meta = {
  title: "Forms/Fieldset",
  tags: ["autodocs"],
  render: (args) => createFieldset(args as FieldsetArgs),
  argTypes: {
    variant: { control: "select", options: ["default", "card"] },
    disabled: { control: "boolean" },
    legend: { control: "text" },
  },
  args: { variant: "default", legend: "Personal Information" },
} satisfies Meta<FieldsetArgs>

export default meta
type Story = StoryObj<FieldsetArgs>

export const Playground: Story = {}
export const CardVariant: Story = { args: { variant: "card" } }
export const Disabled: Story = { args: { disabled: true } }
