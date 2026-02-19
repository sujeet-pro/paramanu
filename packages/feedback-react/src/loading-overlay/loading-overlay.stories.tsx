import type { Meta, StoryObj } from "@storybook/react-vite"
import { Loading } from "./loading-overlay.js"

const meta = {
  title: "Feedback/Loading Overlay",
  component: Loading,
  tags: ["autodocs", "beta"],
  argTypes: {
    visible: { control: "boolean" },
    blur: { control: "boolean" },
  },
  args: {
    visible: true,
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: 200, border: "1px solid #ccc", padding: 16 }}>
        <p>Content underneath the overlay.</p>
        <p>More content here.</p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Visible: Story = {
  args: { visible: true },
}

export const Hidden: Story = {
  args: { visible: false },
}

export const WithBlur: Story = {
  args: { visible: true, blur: true },
}

export const WithCustomContent: Story = {
  args: {
    visible: true,
    children: <div style={{ color: "#333", fontSize: 18 }}>Loading data...</div>,
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ position: "relative", width: 200, height: 150, border: "1px solid #ccc", padding: 8 }}>
        <p>Visible overlay</p>
        <Loading visible />
      </div>
      <div style={{ position: "relative", width: 200, height: 150, border: "1px solid #ccc", padding: 8 }}>
        <p>With blur</p>
        <Loading visible blur />
      </div>
    </div>
  ),
}

export const Accessibility: Story = {
  render: () => (
    <div style={{ position: "relative", height: 100 }}>
      <Loading visible={false} />
    </div>
  ),
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
