import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { DateRangePicker } from "./date-range-picker.js"

const meta = {
  title: "Forms/Date Range Picker",
  tags: ["autodocs", "stable"],
  component: DateRangePicker,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: {} }
export const Open: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const KeyboardInteraction: Story = {
  args: {
    children: (
      <>
        <input placeholder="Start date" />
        <span> - </span>
        <input placeholder="End date" />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const startInput = canvas.getByPlaceholderText("Start date")
    await userEvent.tab()
    await expect(startInput).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Travel dates" },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("[aria-label='Travel dates']")
    await expect(el).toBeInTheDocument()
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
