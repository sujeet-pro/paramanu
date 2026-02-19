import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Highlight } from "./highlight.js"

const meta = {
  title: "Typography/Highlight",
  tags: ["autodocs", "beta"],
  component: Highlight,
  argTypes: {
    color: { control: "select", options: ["primary", "danger", "success", "warning", "info", "neutral"] },
    variant: { control: "select", options: ["filled", "outline", "text"] },
  },
  args: {},
} satisfies Meta<typeof Highlight>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <p>
      This sentence has a <Highlight {...args}>highlighted word</Highlight> in it.
    </p>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "danger", "success", "warning", "info", "neutral"] as const).map((c) => (
        <Highlight key={c} color={c}>
          {c}
        </Highlight>
      ))}
    </div>
  ),
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <Highlight {...args}>outline highlight</Highlight>,
}

export const TextVariant: Story = {
  args: { variant: "text", color: "danger" },
  render: (args) => <Highlight {...args}>text-only highlight</Highlight>,
}

export const Warning: Story = {
  args: { color: "warning" },
  render: (args) => <Highlight {...args}>warning highlight</Highlight>,
}

export const Info: Story = {
  args: { color: "info" },
  render: (args) => <Highlight {...args}>info highlight</Highlight>,
}

export const Neutral: Story = {
  args: { color: "neutral" },
  render: (args) => <Highlight {...args}>neutral highlight</Highlight>,
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => <Highlight {...args}>hover highlight</Highlight>,
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => <Highlight {...args}>focus visible highlight</Highlight>,
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => <Highlight>semantic mark element</Highlight>,
  play: async ({ canvasElement }) => {
    const mark = canvasElement.querySelector("mark")
    await expect(mark).toBeTruthy()
  },
}
