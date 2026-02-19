import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Kbd } from "./kbd.js"

const meta = {
  title: "Typography/Kbd",
  tags: ["autodocs", "beta"],
  component: Kbd,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline", "subtle"] },
  },
  args: {},
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <Kbd {...args}>Ctrl</Kbd>,
}

export const KeyCombination: Story = {
  render: () => (
    <p>
      Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy.
    </p>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Kbd key={s} size={s}>
          {s}
        </Kbd>
      ))}
    </div>
  ),
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <Kbd {...args}>Enter</Kbd>,
}

export const Subtle: Story = {
  args: { variant: "subtle" },
  render: (args) => <Kbd {...args}>Esc</Kbd>,
}

export const SizeXs: Story = {
  args: { size: "xs" },
  render: (args) => <Kbd {...args}>Tab</Kbd>,
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
  render: (args) => <Kbd {...args}>Shift</Kbd>,
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => <Kbd {...args}>Alt</Kbd>,
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => <Kbd>Enter</Kbd>,
  play: async ({ canvasElement }) => {
    const kbd = canvasElement.querySelector("kbd")
    await expect(kbd).toBeTruthy()
  },
}
