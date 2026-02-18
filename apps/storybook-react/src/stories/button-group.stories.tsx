import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonGroup } from "@paramanu/buttons-react"

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    attached: { control: "boolean" },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    "aria-label": "Actions",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
}

export const Attached: Story = {
  args: {
    attached: true,
    "aria-label": "Actions",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    "aria-label": "Actions",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Top</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Bottom</Button>
    </ButtonGroup>
  ),
}

export const VerticalAttached: Story = {
  args: {
    orientation: "vertical",
    attached: true,
    "aria-label": "Actions",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Top</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Bottom</Button>
    </ButtonGroup>
  ),
}

export const PrimaryAttached: Story = {
  args: {
    attached: true,
    "aria-label": "Actions",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">Save</Button>
      <Button variant="primary">Save As</Button>
      <Button variant="primary">Export</Button>
    </ButtonGroup>
  ),
}

export const MixedVariants: Story = {
  args: {
    "aria-label": "Actions",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </ButtonGroup>
  ),
}
