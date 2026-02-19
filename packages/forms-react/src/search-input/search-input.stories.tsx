import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Search } from "./search-input.js"

const meta = {
  title: "Forms/Search Input",
  tags: ["autodocs", "beta"],
  component: Search,
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
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Search>

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

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Search unstyled..." },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Search small..." },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Search large..." },
}

export const ExtraSmall: Story = {
  args: { size: "xs", placeholder: "Search extra small..." },
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

export const TypeAndSearch: Story = {
  args: { placeholder: "Type to search...", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Type to search...")
    await userEvent.type(input, "test query")
    await expect(input).toHaveValue("test query")
  },
}

export const ClearSearch: Story = {
  args: { placeholder: "Clear me...", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Clear me...")
    await userEvent.type(input, "some text")
    await userEvent.clear(input)
    await expect(input).toHaveValue("")
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-search")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const search = canvas.getByRole("search")
    await expect(search).toBeTruthy()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
