import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Button } from "../button/button.js"
import { ButtonGroup } from "./button-group.js"

const meta = {
  title: "Buttons/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    attached: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    "aria-label": "Actions",
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story with all controls exposed. */
export const Playground: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
}

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Top</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Bottom</Button>
    </ButtonGroup>
  ),
}

export const Attached: Story = {
  args: { attached: true },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
}

export const VerticalAttached: Story = {
  args: { orientation: "vertical", attached: true },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Top</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Bottom</Button>
    </ButtonGroup>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary" fullWidth>
        Left
      </Button>
      <Button variant="secondary" fullWidth>
        Right
      </Button>
    </ButtonGroup>
  ),
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["horizontal", "vertical"] as const).map((orientation) => (
        <div key={orientation}>
          <p style={{ marginBottom: 8 }}>
            {orientation} / attached
          </p>
          <ButtonGroup orientation={orientation} attached aria-label={`${orientation} group`}>
            <Button variant="primary">One</Button>
            <Button variant="primary">Two</Button>
            <Button variant="primary">Three</Button>
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
}

export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup aria-label="Mixed actions">
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </ButtonGroup>
  ),
}

export const TwoButtons: Story = {
  args: { attached: true },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Yes</Button>
      <Button variant="secondary">No</Button>
    </ButtonGroup>
  ),
}

export const WithDisabledButton: Story = {
  render: () => (
    <ButtonGroup attached aria-label="Actions">
      <Button variant="secondary">Edit</Button>
      <Button variant="secondary" disabled>
        Share
      </Button>
      <Button variant="danger">Delete</Button>
    </ButtonGroup>
  ),
}

export const GroupRole: Story = {
  render: () => (
    <ButtonGroup aria-label="Formatting options">
      <Button variant="outline">Bold</Button>
      <Button variant="outline">Italic</Button>
      <Button variant="outline">Underline</Button>
    </ButtonGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group", { name: "Formatting options" })
    await expect(group).toBeInTheDocument()
  },
}
