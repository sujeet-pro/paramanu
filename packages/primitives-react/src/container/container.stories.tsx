import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Container } from "./container.js"

const meta = {
  title: "Primitives/Container",
  tags: ["autodocs", "stable"],
  component: Container,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "full"] },
    fluid: { control: "boolean" },
    px: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    center: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Container {...args} style={{ border: "1px dashed #ccc" }}>
      <div style={{ background: "#e2e8f0", padding: "16px" }}>Content inside container</div>
    </Container>
  ),
}

/** Small container. */
export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Container {...args} style={{ border: "1px dashed #ccc" }}>
      <div style={{ background: "#e2e8f0", padding: "16px" }}>Small container</div>
    </Container>
  ),
}

/** Fluid container (100% width). */
export const Fluid: Story = {
  args: { fluid: true },
  render: (args) => (
    <Container {...args} style={{ border: "1px dashed #ccc" }}>
      <div style={{ background: "#e2e8f0", padding: "16px" }}>Fluid container</div>
    </Container>
  ),
}

/** Container with centered content. */
export const Centered: Story = {
  args: { size: "lg", center: true },
  render: (args) => (
    <Container {...args} style={{ border: "1px dashed #ccc", height: "200px" }}>
      <div style={{ background: "#e2e8f0", padding: "16px" }}>Centered content</div>
    </Container>
  ),
}

/** Extra small container. */
export const ExtraSmall: Story = {
  args: { size: "xs" },
  render: Playground.render,
}

/** Medium container. */
export const Medium: Story = {
  args: { size: "md" },
  render: Playground.render,
}

/** Extra large container. */
export const ExtraLarge: Story = {
  args: { size: "xl" },
  render: Playground.render,
}

/** 2XL container. */
export const TwoXL: Story = {
  args: { size: "2xl" },
  render: Playground.render,
}

/** Full width container. */
export const Full: Story = {
  args: { size: "full" },
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
  args: { size: "lg" },
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-container")
    await expect(el).toBeTruthy()
  },
}
