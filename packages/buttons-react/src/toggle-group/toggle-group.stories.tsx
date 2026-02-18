import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group.js"

const meta = {
  title: "Buttons/Toggle Group",
  component: ToggleGroup,
  tags: ["autodocs", "stable"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    attached: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    type: "single",
    orientation: "horizontal",
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <ToggleGroup {...args} aria-label="Alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState("center")
    return (
      <ToggleGroup type="single" value={value} onChange={setValue as (v: string | string[]) => void} aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["bold"])
    return (
      <ToggleGroup type="multiple" value={value} onChange={setValue as (v: string | string[]) => void} aria-label="Formatting">
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
        <ToggleGroupItem value="underline">U</ToggleGroupItem>
      </ToggleGroup>
    )
  },
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup type="single" orientation="vertical" value="top" aria-label="Position">
      <ToggleGroupItem value="top">Top</ToggleGroupItem>
      <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
      <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Attached: Story = {
  render: () => (
    <ToggleGroup type="single" attached value="center" aria-label="Alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <ToggleGroup type="single" fullWidth value="a" aria-label="Options">
      <ToggleGroupItem value="a">Option A</ToggleGroupItem>
      <ToggleGroupItem value="b">Option B</ToggleGroupItem>
      <ToggleGroupItem value="c">Option C</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <ToggleGroup key={size} type="single" size={size} attached value="b" aria-label={`Size ${size}`}>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <ToggleGroup type="single" value="left" aria-label="Alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center" disabled>
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const GroupRole: Story = {
  render: () => (
    <ToggleGroup type="single" value="a" aria-label="Selection group">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group", { name: "Selection group" })
    await expect(group).toBeInTheDocument()
  },
}

export const ClickInteraction: Story = {
  render: () => {
    const handleChange = fn()
    return (
      <ToggleGroup type="single" value="a" onChange={handleChange} aria-label="Selection">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole("button")
    await userEvent.click(buttons[1])
    await expect(buttons[1]).toHaveFocus()
  },
}

export const KeyboardNavigation: Story = {
  render: () => (
    <ToggleGroup type="single" value="a" aria-label="Keyboard test">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
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
  render: () => (
    <ToggleGroup type="single" attached value="a" aria-label="Hover test">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <ToggleGroup type="single" attached value="a" aria-label="Focus test">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  render: () => (
    <ToggleGroup type="single" attached value="a" aria-label="Active test">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: { pseudo: { active: true } },
}
