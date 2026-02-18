import type { Meta, StoryObj } from "@storybook/react"
import { Splitter, SplitterPanel, SplitterHandle } from "./splitter.js"

const meta = {
  title: "Primitives/Splitter",
  tags: ["autodocs"],
  component: Splitter,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Splitter>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <Splitter {...args} style={{ height: "300px", border: "1px solid #e2e8f0" }}>
      <SplitterPanel defaultSize={50}>
        <div style={{ padding: "16px", height: "100%" }}>Left Panel</div>
      </SplitterPanel>
      <SplitterHandle />
      <SplitterPanel defaultSize={50}>
        <div style={{ padding: "16px", height: "100%" }}>Right Panel</div>
      </SplitterPanel>
    </Splitter>
  ),
}

/** Horizontal splitter (default). */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: Playground.render,
}

/** Vertical splitter. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Splitter {...args} style={{ height: "400px", border: "1px solid #e2e8f0" }}>
      <SplitterPanel defaultSize={50}>
        <div style={{ padding: "16px" }}>Top Panel</div>
      </SplitterPanel>
      <SplitterHandle />
      <SplitterPanel defaultSize={50}>
        <div style={{ padding: "16px" }}>Bottom Panel</div>
      </SplitterPanel>
    </Splitter>
  ),
}

/** Disabled splitter. */
export const Disabled: Story = {
  args: { disabled: true },
  render: Playground.render,
}
