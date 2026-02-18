import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "./calendar.js"

const meta = {
  title: "Forms/Calendar",
  tags: ["autodocs"],
  component: Calendar,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
  },
  args: {},
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { children: "Calendar content" } }
export const Small: Story = { args: { size: "sm", children: "Small calendar" } }
export const Large: Story = { args: { size: "lg", children: "Large calendar" } }
