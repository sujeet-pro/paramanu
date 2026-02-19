import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Fab } from "./fab.js"

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const meta = {
  title: "Btns/FAB",
  component: Fab,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    position: {
      control: "select",
      options: ["bottom-right", "bottom-left", "bottom-center"],
    },
    extended: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: <PlusIcon />,
    "aria-label": "Add item",
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: 200, border: "1px dashed #ccc" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Fab>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Small: Story = {
  args: { size: "sm" },
}

export const Medium: Story = {
  args: { size: "md" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Fab key={size} size={size} aria-label={`Add ${size}`} style={{ position: "static" }}>
          <PlusIcon />
        </Fab>
      ))}
    </div>
  ),
}

export const BottomRight: Story = {
  args: { position: "bottom-right" },
}

export const BottomLeft: Story = {
  args: { position: "bottom-left" },
}

export const BottomCenter: Story = {
  args: { position: "bottom-center" },
}

export const Extended: Story = {
  args: {
    extended: true,
    children: (
      <>
        <PlusIcon /> Add Item
      </>
    ),
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Fab aria-label="Default" style={{ position: "static" }}>
        <PlusIcon />
      </Fab>
      <Fab disabled aria-label="Disabled" style={{ position: "static" }}>
        <PlusIcon />
      </Fab>
      <Fab extended aria-label="Extended" style={{ position: "static" }}>
        <PlusIcon /> Create
      </Fab>
    </div>
  ),
}

export const ClickHandler: Story = {
  args: {
    onClick: fn(),
    style: { position: "static" },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const KeyboardInteraction: Story = {
  args: {
    onClick: fn(),
    style: { position: "static" },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    button.focus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: {
    "aria-label": "Create new document",
    style: { position: "static" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Create new document" })
    await expect(button).toBeInTheDocument()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  parameters: { pseudo: { active: true } },
}
