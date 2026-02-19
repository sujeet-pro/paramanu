import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Textarea } from "./textarea.js"

const meta = {
  title: "Forms/Textarea",
  tags: ["autodocs", "beta"],
  component: Textarea,
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    readOnly: { control: "boolean" },
    fullWidth: { control: "boolean" },
    autosize: { control: "boolean" },
    rows: { control: "number" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Enter text...",
    rows: 3,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Outline textarea" },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Filled textarea" },
}

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Unstyled textarea" },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Small textarea" },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Large textarea" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", placeholder: "Extra small textarea" },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled textarea" },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Invalid textarea" },
}

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "Read-only content" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, placeholder: "Full width textarea" },
}

export const NoResize: Story = {
  args: { resize: "none", placeholder: "Cannot resize" },
}

export const HorizontalResize: Story = {
  args: { resize: "horizontal", placeholder: "Horizontal resize" },
}

export const BothResize: Story = {
  args: { resize: "both", placeholder: "Both directions resize" },
}

export const TypeInteraction: Story = {
  args: { placeholder: "Type here...", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText("Type here...")
    await userEvent.type(textarea, "Hello World")
    await expect(textarea).toHaveValue("Hello World")
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-textarea")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: { placeholder: "A11y test" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox")
    await expect(textarea).toBeTruthy()
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
