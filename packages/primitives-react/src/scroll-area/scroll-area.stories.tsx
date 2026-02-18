import type { Meta, StoryObj } from "@storybook/react"
import { ScrollArea } from "./scroll-area.js"

const meta = {
  title: "Primitives/Scroll Area",
  tags: ["autodocs"],
  component: ScrollArea,
  argTypes: {
    direction: { control: "select", options: ["vertical", "horizontal", "both"] },
    scrollbar: { control: "select", options: ["auto", "always", "hover", "hidden"] },
    scrollbarSize: { control: "select", options: ["thin", "none"] },
    bordered: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const longContent = Array.from({ length: 20 }, (_, i) => (
  <p key={i}>Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
))

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ height: "200px" }} aria-label="Scrollable content">
      {longContent}
    </ScrollArea>
  ),
}

/** Vertical scroll with border. */
export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <ScrollArea {...args} style={{ height: "200px" }} aria-label="Bordered scroll area">
      {longContent}
    </ScrollArea>
  ),
}

/** Horizontal scroll. */
export const Horizontal: Story = {
  args: { direction: "horizontal" },
  render: (args) => (
    <ScrollArea {...args} style={{ width: "300px" }} aria-label="Horizontal scroll">
      <div style={{ display: "flex", gap: "16px", width: "800px" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ background: "#e2e8f0", padding: "16px", minWidth: "100px" }}>
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

/** Hidden scrollbar. */
export const HiddenScrollbar: Story = {
  args: { scrollbar: "hidden" },
  render: (args) => (
    <ScrollArea {...args} style={{ height: "200px" }} aria-label="Hidden scrollbar">
      {longContent}
    </ScrollArea>
  ),
}
