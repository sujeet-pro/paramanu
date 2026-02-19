import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Center } from "./center.js"

const meta = {
  title: "Primitives/Center",
  tags: ["autodocs", "beta"],
  component: Center,
  argTypes: {
    inline: { control: "boolean" },
    textCenter: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Center>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <Center {...args} style={{ height: "200px", border: "1px dashed #ccc" }}>
      <div style={{ background: "#e2e8f0", padding: "16px" }}>Centered content</div>
    </Center>
  ),
}

/** Inline center. */
export const Inline: Story = {
  args: { inline: true },
  render: (args) => (
    <Center {...args} style={{ height: "100px", border: "1px dashed #ccc" }}>
      <span>Inline centered</span>
    </Center>
  ),
}

/** Center with text alignment. */
export const WithTextCenter: Story = {
  args: { textCenter: true },
  render: (args) => (
    <Center {...args} style={{ height: "200px", border: "1px dashed #ccc" }}>
      <div style={{ width: "200px" }}>Text is also centered within this block</div>
    </Center>
  ),
}

/** Inline center with text alignment. */
export const InlineWithTextCenter: Story = {
  args: { inline: true, textCenter: true },
  render: Playground.render,
}

export const Hover: Story = {
  render: Playground.render,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: Playground.render,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-center")
    await expect(el).toBeTruthy()
  },
}
