import type { Meta, StoryObj } from "@storybook/react"
import { NativeSelect } from "./native-select.js"

const meta = {
  title: "Forms/Native Select",
  tags: ["autodocs"],
  component: NativeSelect,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof NativeSelect>

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
