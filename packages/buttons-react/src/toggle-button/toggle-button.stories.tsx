import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ToggleBtn } from "./toggle-button.js"

const meta = {
  title: "Btns/Toggle Btn",
  component: ToggleBtn,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    children: "Toggle",
    onChange: fn(),
  },
} satisfies Meta<typeof ToggleBtn>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { pressed: false },
}

export const Default: Story = {
  args: { variant: "default", children: "Default" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
}

export const Pressed: Story = {
  args: { pressed: true, children: "Pressed" },
}

export const NotPressed: Story = {
  args: { pressed: false, children: "Not Pressed" },
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["default", "outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <ToggleBtn key={size} variant={variant} size={size} pressed>
              {variant} {size}
            </ToggleBtn>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full Width Toggle" },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <ToggleBtn pressed={false}>Unpressed</ToggleBtn>
      <ToggleBtn pressed>Pressed</ToggleBtn>
      <ToggleBtn disabled>Disabled</ToggleBtn>
      <ToggleBtn pressed disabled>
        Pressed Disabled
      </ToggleBtn>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false)
    return (
      <ToggleBtn pressed={pressed} onChange={setPressed}>
        {pressed ? "On" : "Off"}
      </ToggleBtn>
    )
  },
}

export const ClickToggle: Story = {
  args: {
    children: "Bold",
    pressed: false,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(button)
    await expect(args.onChange).toHaveBeenCalledWith(true)
  },
}

export const KeyboardInteraction: Story = {
  args: {
    children: "Bold",
    pressed: false,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    button.focus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onChange).toHaveBeenCalledWith(true)
  },
}

export const Accessibility: Story = {
  args: {
    children: "Bold",
    pressed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Bold" })
    await expect(button).toHaveAttribute("aria-pressed", "true")
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  parameters: { pseudo: { active: true } },
}
