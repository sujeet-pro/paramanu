import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Combobox } from "./combobox.js"

const meta = {
  title: "Forms/Combobox",
  tags: ["autodocs", "stable"],
  component: Combobox,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Search...",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <div role="option">Apple</div>
        <div role="option">Banana</div>
        <div role="option">Cherry</div>
      </>
    ),
  },
}

export const Open: Story = {
  args: {
    open: true,
    children: (
      <>
        <div role="option">Apple</div>
        <div role="option">Banana</div>
      </>
    ),
  },
}

export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const FullWidth: Story = { args: { fullWidth: true } }

export const TypeInteraction: Story = {
  args: { placeholder: "Type to filter..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("combobox")
    await userEvent.type(input, "App")
    await expect(input).toHaveValue("App")
  },
}

export const KeyboardInteraction: Story = {
  args: { placeholder: "Search..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("combobox")
    await userEvent.tab()
    await expect(input).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: { "aria-label": "Fruit selector", placeholder: "Search fruits..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("combobox")
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
