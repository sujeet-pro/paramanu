import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Fieldset } from "./fieldset.js"

const meta = {
  title: "Forms/Fieldset",
  component: Fieldset,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "card"] },
    disabled: { control: "boolean" },
    legend: { control: "text" },
  },
  args: { variant: "default" },
} satisfies Meta<typeof Fieldset>

export default meta
type Story = StoryObj<typeof Fieldset>

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
    const canvas = within(canvasElement)
    const fieldset = canvasElement.querySelector("fieldset")
    await expect(fieldset).toBeDisabled()
  },
}
