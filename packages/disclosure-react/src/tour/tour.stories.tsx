import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Tour, TourStep, TourOverlay } from "./tour.js"

const meta = {
  title: "Disclosure/Tour",
  component: Tour,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
  },
  args: {
    open: true,
  },
} satisfies Meta<typeof Tour>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Tour {...args}>
      <TourOverlay visible={args.open} />
      <TourStep placement="bottom" active>
        <h3>Welcome!</h3>
        <p>This is the first step of the tour.</p>
      </TourStep>
    </Tour>
  ),
}

export const Default: Story = {
  args: { open: true },
  render: (args) => (
    <Tour {...args}>
      <TourOverlay visible />
      <TourStep placement="bottom" active>
        <h3>Step 1</h3>
        <p>Introduction to the feature.</p>
      </TourStep>
    </Tour>
  ),
}

export const TopPlacement: Story = {
  args: { open: true },
  render: (args) => (
    <div style={{ paddingTop: "200px" }}>
      <Tour {...args}>
        <TourStep placement="top" active>
          <h3>Top Placement</h3>
          <p>Step appears above the target.</p>
        </TourStep>
      </Tour>
    </div>
  ),
}

export const LeftPlacement: Story = {
  args: { open: true },
  render: (args) => (
    <div style={{ paddingLeft: "300px" }}>
      <Tour {...args}>
        <TourStep placement="left" active>
          <h3>Left Placement</h3>
          <p>Step appears to the left.</p>
        </TourStep>
      </Tour>
    </div>
  ),
}

export const RightPlacement: Story = {
  args: { open: true },
  render: (args) => (
    <Tour {...args}>
      <TourStep placement="right" active>
        <h3>Right Placement</h3>
        <p>Step appears to the right.</p>
      </TourStep>
    </Tour>
  ),
}

export const Closed: Story = {
  args: { open: false },
  render: (args) => (
    <Tour {...args}>
      <TourOverlay visible={false} />
      <TourStep placement="bottom">
        <h3>Hidden Step</h3>
      </TourStep>
    </Tour>
  ),
}

export const WithOverlay: Story = {
  args: { open: true },
  render: (args) => (
    <Tour {...args}>
      <TourOverlay visible />
      <TourStep placement="bottom" active>
        <h3>Guided Tour</h3>
        <p>The overlay dims the background.</p>
      </TourStep>
    </Tour>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const dialog = canvas.getByRole("dialog")
    await expect(dialog).toBeInTheDocument()
  },
}
