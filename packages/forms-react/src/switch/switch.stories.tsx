import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Switch } from "./switch.js"

const meta = {
  title: "Forms/Switch",
  tags: ["autodocs", "beta"],
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
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
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

export const ExtraSmall: Story = {
  args: { size: "xs", children: "Extra small switch" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled switch" },
}

export const LabelStart: Story = {
  args: { labelPlacement: "start", children: "Label start" },
}

export const LabelEnd: Story = {
  args: { labelPlacement: "end", children: "Label end" },
}

export const ToggleInteraction: Story = {
  args: { children: "Toggle me", onChange: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")
    await userEvent.click(switchEl)
    await expect(switchEl).toBeChecked()
  },
}

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-switch")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")
    await expect(switchEl).toBeTruthy()
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
