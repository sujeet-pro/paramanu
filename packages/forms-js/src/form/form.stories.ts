import type { Meta, StoryObj } from "@storybook/html-vite"
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
  tags: ["autodocs", "stable"],
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
export const SmallGap: Story = { args: { gap: "sm" } }
export const LargeGap: Story = { args: { gap: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
