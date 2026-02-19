import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { Calendar } from "./calendar.js"

const meta = {
  title: "Forms/Calendar",
  tags: ["autodocs", "beta"],
  component: Calendar,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { children: "Calendar content" } }
export const ExtraSmall: Story = { args: { size: "xs", children: "Extra small calendar" } }
export const Small: Story = { args: { size: "sm", children: "Small calendar" } }
export const Large: Story = { args: { size: "lg", children: "Large calendar" } }

export const Accessibility: Story = {
  args: { "aria-label": "Event calendar", children: "Calendar content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("grid", { name: "Event calendar" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: { children: "Calendar content" },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { children: "Calendar content" },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { children: "Calendar content" },
  parameters: { pseudo: { active: true } },
}
