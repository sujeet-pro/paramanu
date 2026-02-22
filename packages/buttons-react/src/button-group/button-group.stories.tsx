import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Btn } from "../button/button.js"
import { BtnGroup } from "./button-group.js"

const meta = {
  title: "Btns/Btn Group",
  component: BtnGroup,
  tags: ["autodocs", "beta"],
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
} satisfies Meta<typeof BtnGroup>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story with all controls exposed. */
export const Playground: Story = {
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Left</Btn>
      <Btn variant="secondary">Center</Btn>
      <Btn variant="secondary">Right</Btn>
    </BtnGroup>
  ),
}

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Left</Btn>
      <Btn variant="secondary">Center</Btn>
      <Btn variant="secondary">Right</Btn>
    </BtnGroup>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Top</Btn>
      <Btn variant="secondary">Middle</Btn>
      <Btn variant="secondary">Bottom</Btn>
    </BtnGroup>
  ),
}

export const Attached: Story = {
  args: { attached: true },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Left</Btn>
      <Btn variant="secondary">Center</Btn>
      <Btn variant="secondary">Right</Btn>
    </BtnGroup>
  ),
}

export const VerticalAttached: Story = {
  args: { orientation: "vertical", attached: true },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Top</Btn>
      <Btn variant="secondary">Middle</Btn>
      <Btn variant="secondary">Bottom</Btn>
    </BtnGroup>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary" fullWidth>
        Left
      </Btn>
      <Btn variant="secondary" fullWidth>
        Right
      </Btn>
    </BtnGroup>
  ),
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["horizontal", "vertical"] as const).map((orientation) => (
        <div key={orientation}>
          <p style={{ marginBottom: 8 }}>{orientation} / attached</p>
          <BtnGroup orientation={orientation} attached aria-label={`${orientation} group`}>
            <Btn variant="primary">One</Btn>
            <Btn variant="primary">Two</Btn>
            <Btn variant="primary">Three</Btn>
          </BtnGroup>
        </div>
      ))}
    </div>
  ),
}

export const MixedVariants: Story = {
  render: () => (
    <BtnGroup aria-label="Mixed actions">
      <Btn variant="primary">Save</Btn>
      <Btn variant="secondary">Cancel</Btn>
      <Btn variant="danger">Delete</Btn>
    </BtnGroup>
  ),
}

export const TwoBtns: Story = {
  args: { attached: true },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Yes</Btn>
      <Btn variant="secondary">No</Btn>
    </BtnGroup>
  ),
}

export const WithDisabledBtn: Story = {
  render: () => (
    <BtnGroup attached aria-label="Actions">
      <Btn variant="secondary">Edit</Btn>
      <Btn variant="secondary" disabled>
        Share
      </Btn>
      <Btn variant="danger">Delete</Btn>
    </BtnGroup>
  ),
}

export const GroupRole: Story = {
  render: () => (
    <BtnGroup aria-label="Formatting options">
      <Btn variant="outline">Bold</Btn>
      <Btn variant="outline">Italic</Btn>
      <Btn variant="outline">Underline</Btn>
    </BtnGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group", { name: "Formatting options" })
    await expect(group).toBeInTheDocument()
  },
}

export const ClickInteraction: Story = {
  render: () => {
    const handleClick = fn()
    return (
      <BtnGroup aria-label="Actions">
        <Btn variant="secondary" onClick={handleClick}>
          First
        </Btn>
        <Btn variant="secondary">Second</Btn>
      </BtnGroup>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole("button")
    await userEvent.click(buttons[0])
    await expect(buttons[0]).toHaveFocus()
  },
}

export const KeyboardNavigation: Story = {
  render: () => (
    <BtnGroup aria-label="Navigation">
      <Btn variant="secondary">One</Btn>
      <Btn variant="secondary">Two</Btn>
      <Btn variant="secondary">Three</Btn>
    </BtnGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole("button")
    buttons[0].focus()
    await expect(buttons[0]).toHaveFocus()
    await userEvent.tab()
    await expect(buttons[1]).toHaveFocus()
  },
}

export const Hover: Story = {
  args: { attached: true },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Left</Btn>
      <Btn variant="secondary">Center</Btn>
      <Btn variant="secondary">Right</Btn>
    </BtnGroup>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: { attached: true },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Left</Btn>
      <Btn variant="secondary">Center</Btn>
      <Btn variant="secondary">Right</Btn>
    </BtnGroup>
  ),
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: { attached: true },
  render: (args) => (
    <BtnGroup {...args}>
      <Btn variant="secondary">Left</Btn>
      <Btn variant="secondary">Center</Btn>
      <Btn variant="secondary">Right</Btn>
    </BtnGroup>
  ),
  parameters: { pseudo: { active: true } },
}
