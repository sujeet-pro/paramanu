import type { Meta, StoryObj } from "@storybook/react"
import { MultiSelect } from "./multi-select.js"

const meta = {
  title: "Forms/Multi Select",
  tags: ["autodocs"],
  component: MultiSelect,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { placeholder: "Select items..." },
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <div role="option">React</div>
        <div role="option">Vue</div>
        <div role="option">Angular</div>
      </>
    ),
  },
}

export const Open: Story = {
  args: { open: true, children: (<><div role="option">React</div><div role="option">Vue</div></>) },
}

export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const FullWidth: Story = { args: { fullWidth: true } }
