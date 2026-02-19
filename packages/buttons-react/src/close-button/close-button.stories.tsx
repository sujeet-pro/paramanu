import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { CloseBtn } from "./close-button.js"

const meta = {
  title: "Btns/Close Btn",
  component: CloseBtn,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CloseBtn>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const ExtraSmall: Story = {
  args: { size: "xs" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Medium: Story = {
  args: { size: "md" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <CloseBtn key={size} size={size} aria-label={`Close ${size}`} />
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <CloseBtn aria-label="Default close" />
      <CloseBtn disabled aria-label="Disabled close" />
    </div>
  ),
}

export const CustomIcon: Story = {
  args: {
    children: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
}

export const ClickHandler: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const KeyboardInteraction: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    button.focus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: {
    "aria-label": "Close dialog",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Close dialog" })
    await expect(button).toBeInTheDocument()
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
