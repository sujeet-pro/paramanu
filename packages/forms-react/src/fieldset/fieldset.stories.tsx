import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { Fieldset } from "./fieldset.js"

const meta = {
  title: "Forms/Fieldset",
  component: Fieldset,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: { control: "select", options: ["default", "card"] },
    disabled: { control: "boolean" },
    legend: { control: "text" },
  },
  args: {
    variant: "default",
    onChange: fn(),
  },
} satisfies Meta<typeof Fieldset>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { legend: "Personal Information", children: "Fieldset content" },
}

export const CardVariant: Story = {
  args: { variant: "card", legend: "Card Fieldset", children: "Card variant content" },
}

export const WithoutLegend: Story = {
  args: { children: "Fieldset without legend" },
}

export const Disabled: Story = {
  args: { disabled: true, legend: "Disabled Fieldset", children: "Disabled content" },
  play: async ({ canvasElement }) => {
    const fieldset = canvasElement.querySelector("fieldset")
    await expect(fieldset).toBeDisabled()
  },
}

export const Accessibility: Story = {
  args: { legend: "Contact Information", children: "Form fields here" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("group", { name: "Contact Information" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { legend: "Fieldset", children: "Content" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { legend: "Fieldset", children: "Content" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { legend: "Fieldset", children: "Content" },
  parameters: { pseudo: { active: true } },
}
