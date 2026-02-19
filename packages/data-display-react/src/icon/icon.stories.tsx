import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Icon } from "./icon.js"

const meta = {
  title: "Data Display/Icon",
  component: Icon,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    color: { control: "select", options: ["inherit", "primary", "neutral", "danger", "success"] },
    spin: { control: "boolean" },
    label: { control: "text" },
  },
  args: { size: "md", color: "inherit" },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { label: "Star icon" },
  render: (args) => (
    <Icon {...args}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </Icon>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Icon key={s} size={s} label={`${s} icon`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </Icon>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["primary", "neutral", "danger", "success"] as const).map((c) => (
        <Icon key={c} color={c} label={`${c} icon`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </Icon>
      ))}
    </div>
  ),
}

export const Spinning: Story = {
  args: { spin: true, label: "Loading" },
  render: (args) => (
    <Icon {...args}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    </Icon>
  ),
}

export const Decorative: Story = {
  render: () => (
    <Icon>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Icon>
  ),
}

export const Hover: Story = {
  args: { label: "Hover icon" },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <Icon {...args}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Icon>
  ),
}

export const FocusVisible: Story = {
  args: { label: "Focus icon" },
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <Icon {...args}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Icon>
  ),
}

export const RenderTest: Story = {
  args: { label: "Test icon" },
  render: (args) => (
    <Icon {...args}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Icon>
  ),
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-icon")
    await expect(el).toBeTruthy()
  },
}

export const Accessibility: Story = {
  args: { label: "Accessible icon" },
  render: (args) => (
    <Icon {...args}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Icon>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAttribute("aria-label")
  },
}
