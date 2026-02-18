import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Heading } from "./heading.js"

const meta = {
  title: "Typography/Heading",
  tags: ["autodocs", "stable"],
  component: Heading,
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
    align: { control: "select", options: ["left", "center", "right"] },
    lineHeight: { control: "select", options: ["tight", "normal", "relaxed"] },
    color: {
      control: "select",
      options: ["default", "muted", "dimmed", "primary", "danger", "success", "warning", "info"],
    },
    truncate: { control: "boolean" },
  },
  args: { level: 2 },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Heading {...args}>Section Heading</Heading>,
}

export const Levels: Story = {
  render: () => (
    <div>
      {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
        <Heading key={lvl} level={lvl}>
          Heading Level {lvl}
        </Heading>
      ))}
    </div>
  ),
}

export const CustomSize: Story = {
  render: () => (
    <Heading level={3} size="3xl">
      H3 with 3xl size
    </Heading>
  ),
}

export const Centered: Story = {
  args: { align: "center" },
  render: (args) => <Heading {...args}>Centered Heading</Heading>,
}

export const Primary: Story = {
  args: { color: "primary" },
  render: (args) => <Heading {...args}>Primary Heading</Heading>,
}

export const TruncatedHeading: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Heading level={3} truncate>
        This heading is very long and should be truncated
      </Heading>
    </div>
  ),
}

export const H4: Story = {
  render: () => <Heading level={4}>Heading Level 4</Heading>,
}

export const H5: Story = {
  render: () => <Heading level={5}>Heading Level 5</Heading>,
}

export const H6: Story = {
  render: () => <Heading level={6}>Heading Level 6</Heading>,
}

export const WeightNormal: Story = {
  args: { weight: "normal" },
  render: (args) => <Heading {...args}>Normal weight heading</Heading>,
}

export const WeightMedium: Story = {
  args: { weight: "medium" },
  render: (args) => <Heading {...args}>Medium weight heading</Heading>,
}

export const WeightSemibold: Story = {
  args: { weight: "semibold" },
  render: (args) => <Heading {...args}>Semibold weight heading</Heading>,
}

export const AlignRight: Story = {
  args: { align: "right" },
  render: (args) => <Heading {...args}>Right aligned heading</Heading>,
}

export const LineHeightTight: Story = {
  args: { lineHeight: "tight" },
  render: (args) => <Heading {...args}>Tight line height heading</Heading>,
}

export const LineHeightRelaxed: Story = {
  args: { lineHeight: "relaxed" },
  render: (args) => <Heading {...args}>Relaxed line height heading</Heading>,
}

export const ColorMuted: Story = {
  args: { color: "muted" },
  render: (args) => <Heading {...args}>Muted heading</Heading>,
}

export const ColorDimmed: Story = {
  args: { color: "dimmed" },
  render: (args) => <Heading {...args}>Dimmed heading</Heading>,
}

export const ColorDanger: Story = {
  args: { color: "danger" },
  render: (args) => <Heading {...args}>Danger heading</Heading>,
}

export const ColorSuccess: Story = {
  args: { color: "success" },
  render: (args) => <Heading {...args}>Success heading</Heading>,
}

export const ColorWarning: Story = {
  args: { color: "warning" },
  render: (args) => <Heading {...args}>Warning heading</Heading>,
}

export const ColorInfo: Story = {
  args: { color: "info" },
  render: (args) => <Heading {...args}>Info heading</Heading>,
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => <Heading {...args}>Hover state heading</Heading>,
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => <Heading {...args}>Focus visible heading</Heading>,
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => <Heading level={2}>Semantic heading</Heading>,
  play: async ({ canvasElement }) => {
    const heading = canvasElement.querySelector("h2")
    await expect(heading).toBeTruthy()
  },
}

export const SemanticH1: Story = {
  render: () => <Heading level={1}>H1 heading</Heading>,
  play: async ({ canvasElement }) => {
    const heading = canvasElement.querySelector("h1")
    await expect(heading).toBeTruthy()
  },
}
