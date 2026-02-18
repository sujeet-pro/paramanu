import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { Radio, RadioGroup } from "./radio.js"

const meta = {
  title: "Forms/Radio",
  tags: ["autodocs"],
  component: Radio,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: {
    children: "Option",
    name: "demo",
    value: "1",
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Checked: Story = {
  args: { checked: true, children: "Selected" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small radio" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large radio" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled radio" },
}

export const Invalid: Story = {
  args: { invalid: true, children: "Invalid radio" },
}

export const Group: Story = {
  render: () => (
    <RadioGroup name="fruits">
      <Radio name="fruits" value="apple">Apple</Radio>
      <Radio name="fruits" value="banana">Banana</Radio>
      <Radio name="fruits" value="cherry">Cherry</Radio>
    </RadioGroup>
  ),
}

export const HorizontalGroup: Story = {
  render: () => (
    <RadioGroup name="colors" orientation="horizontal">
      <Radio name="colors" value="red">Red</Radio>
      <Radio name="colors" value="blue">Blue</Radio>
      <Radio name="colors" value="green">Green</Radio>
    </RadioGroup>
  ),
}

export const ClickToSelect: Story = {
  render: () => (
    <RadioGroup name="select-test">
      <Radio name="select-test" value="a">Option A</Radio>
      <Radio name="select-test" value="b">Option B</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const radios = canvas.getAllByRole("radio")
    await userEvent.click(radios[1])
    await expect(radios[1]).toBeChecked()
  },
}
