import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Banner } from "./banner.js"

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs", "beta"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
    sticky: { control: "boolean" },
    dismissible: { control: "boolean" },
    position: { control: "select", options: ["top", "bottom"] },
  },
  args: {
    children: "This is a banner message.",
    onClose: fn(),
  },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Info: Story = { args: { variant: "info", children: "Informational banner." } }
export const Success: Story = { args: { variant: "success", children: "Success banner." } }
export const Warning: Story = { args: { variant: "warning", children: "Warning banner." } }
export const Danger: Story = { args: { variant: "danger", children: "Danger banner." } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["info", "success", "warning", "danger"] as const).map((variant) => (
        <Banner key={variant} variant={variant}>
          {variant} banner message.
        </Banner>
      ))}
    </div>
  ),
}

export const Sticky: Story = {
  args: { sticky: true, children: "Sticky banner." },
}

export const Dismissible: Story = {
  args: { dismissible: true, onClose: fn(), children: "Dismissible banner." },
}

export const WithActions: Story = {
  args: {
    children: "A new version is available.",
    actions: <button type="button">Update now</button>,
  },
}

export const WithIcon: Story = {
  args: {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    children: "Banner with icon.",
  },
}

export const BottomPosition: Story = {
  args: { position: "bottom", sticky: true, children: "Bottom banner." },
}

export const DismissClick: Story = {
  args: { dismissible: true, onClose: fn(), children: "Dismiss me" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const closeBtn = canvas.getByRole("button", { name: "Close" })
    await userEvent.click(closeBtn)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: { children: "Accessible banner" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("status")).toBeInTheDocument()
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
