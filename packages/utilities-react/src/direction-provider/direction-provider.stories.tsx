import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { DirectionProvider, useDirection } from "./direction-provider.js"

function DirectionDisplay() {
  const { dir, setDir } = useDirection()
  return (
    <div style={{ padding: "16px" }}>
      <p>Current direction: {dir}</p>
      <button type="button" onClick={() => setDir("ltr")}>
        LTR
      </button>
      <button type="button" onClick={() => setDir("rtl")}>
        RTL
      </button>
    </div>
  )
}

const meta = {
  title: "Utilities/DirectionProvider",
  component: DirectionProvider,
  tags: ["autodocs", "stable"],
  argTypes: {
    defaultDir: {
      control: "select",
      options: ["ltr", "rtl"],
    },
  },
  args: {
    defaultDir: "ltr",
    children: <DirectionDisplay />,
  },
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof DirectionProvider>

export const Playground: Story = {}

export const RTL: Story = {
  args: { defaultDir: "rtl" },
}

export const RenderTest: Story = {
  args: {
    defaultDir: "ltr",
    children: <div>Test content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}
