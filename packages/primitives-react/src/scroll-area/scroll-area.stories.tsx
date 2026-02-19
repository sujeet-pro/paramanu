import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Scroll } from "./scroll-area.js"

const meta = {
  title: "Primitives/Scroll Area",
  tags: ["autodocs", "beta"],
  component: Scroll,
  argTypes: {
    direction: { control: "select", options: ["vertical", "horizontal", "both"] },
    scrollbar: { control: "select", options: ["auto", "always", "hover", "hidden"] },
    scrollbarSize: { control: "select", options: ["thin", "none"] },
    bordered: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Scroll>

export default meta
type Story = StoryObj<typeof meta>

const longContent = Array.from({ length: 20 }, (_, i) => (
  <p key={i}>Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
))

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <Scroll {...args} style={{ height: "200px" }} aria-label="Scrollable content">
      {longContent}
    </Scroll>
  ),
}

/** Vertical scroll with border. */
export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <Scroll {...args} style={{ height: "200px" }} aria-label="Bordered scroll area">
      {longContent}
    </Scroll>
  ),
}

/** Horizontal scroll. */
export const Horizontal: Story = {
  args: { direction: "horizontal" },
  render: (args) => (
    <Scroll {...args} style={{ width: "300px" }} aria-label="Horizontal scroll">
      <div style={{ display: "flex", gap: "16px", width: "800px" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ background: "#e2e8f0", padding: "16px", minWidth: "100px" }}>
            Item {i + 1}
          </div>
        ))}
      </div>
    </Scroll>
  ),
}

/** Hidden scrollbar. */
export const HiddenScrollbar: Story = {
  args: { scrollbar: "hidden" },
  render: (args) => (
    <Scroll {...args} style={{ height: "200px" }} aria-label="Hidden scrollbar">
      {longContent}
    </Scroll>
  ),
}

/** Both directions scroll. */
export const DirectionBoth: Story = {
  args: { direction: "both" },
  render: Playground.render,
}

/** Scrollbar always visible. */
export const ScrollbarAlways: Story = {
  args: { scrollbar: "always" },
  render: Playground.render,
}

/** Scrollbar visible on hover. */
export const ScrollbarHover: Story = {
  args: { scrollbar: "hover" },
  render: Playground.render,
}

/** Scrollbar size none. */
export const ScrollbarSizeNone: Story = {
  args: { scrollbarSize: "none" },
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
    const el = canvasElement.querySelector(".pm-scroll")
    await expect(el).toBeTruthy()
  },
}

export const Accessibility: Story = {
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("[role='region']")
    await expect(el).toBeTruthy()
  },
}
