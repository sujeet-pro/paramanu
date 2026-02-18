import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { SearchInput } from "./search-input.js"

const meta = {
  title: "Forms/Search Input",
  tags: ["autodocs"],
  component: SearchInput,
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Search...",
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Search outline..." },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Search filled..." },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Search small..." },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Search large..." },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Search disabled..." },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Search invalid..." },
}

export const FullWidth: Story = {
  args: { fullWidth: true, placeholder: "Search full width..." },
}

export const WithTyping: Story = {
  args: { placeholder: "Type to search..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Type to search...")
    await userEvent.type(input, "test query")
    await expect(input).toHaveValue("test query")
  },
}
