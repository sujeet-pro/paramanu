import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within, userEvent } from "storybook/test"
import { FocusTrap } from "./focus-trap.js"

const meta = {
  title: "Utilities/FocusTrap",
  component: FocusTrap,
  tags: ["autodocs", "beta"],
  argTypes: {
    active: { control: "boolean" },
  },
  args: {
    active: true,
    children: (
      <div style={{ padding: "24px", border: "2px solid #ccc" }}>
        <p>Focus is trapped within this area. Try pressing Tab.</p>
        <button type="button">First button</button>
        <button type="button">Second button</button>
        <button type="button">Third button</button>
      </div>
    ),
  },
} satisfies Meta<typeof FocusTrap>

export default meta
type Story = StoryObj<typeof FocusTrap>

export const Playground: Story = {}

export const Inactive: Story = {
  args: { active: false },
}

export const TabNavigation: Story = {
  args: {
    active: true,
    children: (
      <div style={{ padding: "24px", border: "2px solid #007bff" }}>
        <p>Tab cycles through these buttons when trap is active.</p>
        <button type="button">Btn A</button>
        <button type="button" style={{ marginLeft: "8px" }}>
          Btn B
        </button>
        <button type="button" style={{ marginLeft: "8px" }}>
          Btn C
        </button>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttonA = canvas.getByText("Btn A")
    await expect(buttonA).toBeInTheDocument()
    await userEvent.tab()
  },
}

export const RenderTest: Story = {
  args: {
    active: false,
    children: <div>Test content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}
