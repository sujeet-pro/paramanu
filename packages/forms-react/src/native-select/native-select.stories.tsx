import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { NativeSel } from "./native-select.js"

const meta = {
  title: "Forms/Native Select",
  tags: ["autodocs", "beta"],
  component: NativeSel,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof NativeSel>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <option value="">Select...</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: "filled",
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </>
    ),
  },
}

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">Option A</option>
      </>
    ),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">Small A</option>
      </>
    ),
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">Large A</option>
      </>
    ),
  },
}

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">XS A</option>
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">Option A</option>
      </>
    ),
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">Option A</option>
      </>
    ),
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">Full Width</option>
      </>
    ),
  },
}

export const SelectInteraction: Story = {
  args: {
    onChange: fn(),
    children: (
      <>
        <option value="">Select...</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox")
    await userEvent.selectOptions(select, "banana")
    await expect(select).toHaveValue("banana")
  },
}

export const KeyboardNavigation: Story = {
  args: {
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">A</option>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-native-sel")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: {
    children: (
      <>
        <option value="">Select...</option>
        <option value="a">A</option>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole("combobox")
    await expect(select).toBeTruthy()
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
