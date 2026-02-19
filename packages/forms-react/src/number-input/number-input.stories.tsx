import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { NumInput } from "./number-input.js"

const meta = {
  title: "Forms/Number Input",
  tags: ["autodocs", "beta"],
  component: NumInput,
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
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: {
    placeholder: "0",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof NumInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Filled: Story = {
  args: { variant: "filled" },
}

export const Unstyled: Story = {
  args: { variant: "unstyled" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const ExtraSmall: Story = {
  args: { size: "xs" },
}

export const WithMinMax: Story = {
  args: { min: 0, max: 100, step: 5 },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  args: { invalid: true },
}

export const IncrementDecrement: Story = {
  args: { min: 0, max: 10, onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const increment = canvas.getByRole("button", { name: "Increment" })
    await userEvent.click(increment)
    await userEvent.click(increment)
    const decrement = canvas.getByRole("button", { name: "Decrement" })
    await userEvent.click(decrement)
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-num-input")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: { min: 0, max: 100 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const increment = canvas.getByRole("button", { name: "Increment" })
    const decrement = canvas.getByRole("button", { name: "Decrement" })
    await expect(increment).toBeTruthy()
    await expect(decrement).toBeTruthy()
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
