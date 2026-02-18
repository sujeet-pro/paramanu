import type { Meta, StoryObj } from "@storybook/html"
import { formClasses } from "./form.classes.js"
import type { FormClassesOptions } from "./form.types.js"

type FormArgs = FormClassesOptions

function createForm(args: FormArgs): HTMLElement {
  const form = document.createElement("form")
  form.className = formClasses(args)
  form.textContent = "Form content"
  return form
}

const meta = {
  title: "Forms/Form",
  tags: ["autodocs"],
  render: (args) => createForm(args as FormArgs),
  argTypes: {
    layout: { control: "select", options: ["vertical", "horizontal", "inline"] },
    gap: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { layout: "vertical", gap: "md" },
} satisfies Meta<FormArgs>

export default meta
type Story = StoryObj<FormArgs>

export const Playground: Story = {}
export const Horizontal: Story = { args: { layout: "horizontal" } }
export const Inline: Story = { args: { layout: "inline" } }
export const LargeGap: Story = { args: { gap: "lg" } }
