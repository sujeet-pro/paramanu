import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { ShowHide } from "./show-hide.js"

const meta = {
  title: "Utilities/ShowHide",
  component: ShowHide,
  tags: ["autodocs", "stable"],
  argTypes: {
    display: {
      control: "select",
      options: ["show", "hide"],
    },
  },
  args: {
    display: "show",
    children: <div style={{ padding: "16px", background: "#f0f0ff" }}>Togglable content</div>,
  },
} satisfies Meta<typeof ShowHide>

export default meta
type Story = StoryObj<typeof ShowHide>

export const Playground: Story = {}

export const Hidden: Story = {
  args: { display: "hide" },
}

export const RenderTest: Story = {
  args: {
    display: "show",
    children: <div>Test content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}
