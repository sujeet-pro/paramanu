import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { Switch } from "./switch.js"

const meta = {
  title: "Forms/Switch",
  tags: ["autodocs"],
  component: Switch,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    labelPlacement: {
      control: "select",
      options: ["start", "end"],
    },
  },
  args: {
    children: "Dark mode",
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
}

export const Checked: Story = {
  args: { checked: true, children: "Enabled" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small switch" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large switch" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled switch" },
}

export const LabelStart: Story = {
  args: { labelPlacement: "start", children: "Label start" },
}

export const ToggleSwitch: Story = {
  args: { children: "Toggle me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")
    await userEvent.click(switchEl)
    await expect(switchEl).toBeChecked()
  },
}
