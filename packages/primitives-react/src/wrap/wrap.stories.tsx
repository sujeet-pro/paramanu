import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Wrap } from "./wrap.js"

const meta = {
  title: "Primitives/Wrap",
  tags: ["autodocs", "beta"],
  component: Wrap,
  argTypes: {
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    direction: { control: "select", options: ["row", "row-reverse"] },
  },
  args: {},
} satisfies Meta<typeof Wrap>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 10 }, (_, i) => (
  <div key={i} style={{ background: "#e2e8f0", padding: "4px 12px", borderRadius: "4px" }}>
    Tag {i + 1}
  </div>
))

/** The default playground story. */
export const Playground: Story = {
  args: { gap: "3" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Wrap with center alignment. */
export const CenterAligned: Story = {
  args: { gap: "3", align: "center", justify: "center" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Wrap with reverse direction. */
export const Reversed: Story = {
  args: { gap: "3", direction: "row-reverse" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Align start. */
export const AlignStart: Story = {
  args: { gap: "3", align: "start" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Align end. */
export const AlignEnd: Story = {
  args: { gap: "3", align: "end" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Align stretch. */
export const AlignStretch: Story = {
  args: { gap: "3", align: "stretch" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Align baseline. */
export const AlignBaseline: Story = {
  args: { gap: "3", align: "baseline" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Justify start. */
export const JustifyStart: Story = {
  args: { gap: "3", justify: "start" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Justify end. */
export const JustifyEnd: Story = {
  args: { gap: "3", justify: "end" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Justify between. */
export const JustifyBetween: Story = {
  args: { gap: "3", justify: "between" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Justify around. */
export const JustifyAround: Story = {
  args: { gap: "3", justify: "around" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

/** Justify evenly. */
export const JustifyEvenly: Story = {
  args: { gap: "3", justify: "evenly" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
}

export const Hover: Story = {
  args: { gap: "3" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { gap: "3" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  args: { gap: "3" },
  render: (args) => <Wrap {...args}>{tags}</Wrap>,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-wrap")
    await expect(el).toBeTruthy()
  },
}
