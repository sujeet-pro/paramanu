import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ToggleGrp, ToggleGrpItem } from "./toggle-group.js"

const meta = {
  title: "Btns/Toggle Group",
  component: ToggleGrp,
  tags: ["autodocs", "beta"],
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
} satisfies Meta<typeof ToggleGrp>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <ToggleGrp {...args} aria-label="Alignment">
      <ToggleGrpItem value="left">Left</ToggleGrpItem>
      <ToggleGrpItem value="center">Center</ToggleGrpItem>
      <ToggleGrpItem value="right">Right</ToggleGrpItem>
    </ToggleGrp>
  ),
}

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState("center")
    return (
      <ToggleGrp type="single" value={value} onChange={setValue as (v: string | string[]) => void} aria-label="Alignment">
        <ToggleGrpItem value="left">Left</ToggleGrpItem>
        <ToggleGrpItem value="center">Center</ToggleGrpItem>
        <ToggleGrpItem value="right">Right</ToggleGrpItem>
      </ToggleGrp>
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["bold"])
    return (
      <ToggleGrp type="multiple" value={value} onChange={setValue as (v: string | string[]) => void} aria-label="Formatting">
        <ToggleGrpItem value="bold">B</ToggleGrpItem>
        <ToggleGrpItem value="italic">I</ToggleGrpItem>
        <ToggleGrpItem value="underline">U</ToggleGrpItem>
      </ToggleGrp>
    )
  },
}

export const Vertical: Story = {
  render: () => (
    <ToggleGrp type="single" orientation="vertical" value="top" aria-label="Position">
      <ToggleGrpItem value="top">Top</ToggleGrpItem>
      <ToggleGrpItem value="middle">Middle</ToggleGrpItem>
      <ToggleGrpItem value="bottom">Bottom</ToggleGrpItem>
    </ToggleGrp>
  ),
}

export const Attached: Story = {
  render: () => (
    <ToggleGrp type="single" attached value="center" aria-label="Alignment">
      <ToggleGrpItem value="left">Left</ToggleGrpItem>
      <ToggleGrpItem value="center">Center</ToggleGrpItem>
      <ToggleGrpItem value="right">Right</ToggleGrpItem>
    </ToggleGrp>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <ToggleGrp type="single" fullWidth value="a" aria-label="Options">
      <ToggleGrpItem value="a">Option A</ToggleGrpItem>
      <ToggleGrpItem value="b">Option B</ToggleGrpItem>
      <ToggleGrpItem value="c">Option C</ToggleGrpItem>
    </ToggleGrp>
  ),
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <ToggleGrp key={size} type="single" size={size} attached value="b" aria-label={`Size ${size}`}>
          <ToggleGrpItem value="a">A</ToggleGrpItem>
          <ToggleGrpItem value="b">B</ToggleGrpItem>
          <ToggleGrpItem value="c">C</ToggleGrpItem>
        </ToggleGrp>
      ))}
    </div>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <ToggleGrp type="single" value="left" aria-label="Alignment">
      <ToggleGrpItem value="left">Left</ToggleGrpItem>
      <ToggleGrpItem value="center" disabled>
        Center
      </ToggleGrpItem>
      <ToggleGrpItem value="right">Right</ToggleGrpItem>
    </ToggleGrp>
  ),
}

export const GroupRole: Story = {
  render: () => (
    <ToggleGrp type="single" value="a" aria-label="Selection group">
      <ToggleGrpItem value="a">A</ToggleGrpItem>
      <ToggleGrpItem value="b">B</ToggleGrpItem>
    </ToggleGrp>
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
      <ToggleGrp type="single" value="a" onChange={handleChange} aria-label="Selection">
        <ToggleGrpItem value="a">A</ToggleGrpItem>
        <ToggleGrpItem value="b">B</ToggleGrpItem>
        <ToggleGrpItem value="c">C</ToggleGrpItem>
      </ToggleGrp>
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
    <ToggleGrp type="single" value="a" aria-label="Keyboard test">
      <ToggleGrpItem value="a">A</ToggleGrpItem>
      <ToggleGrpItem value="b">B</ToggleGrpItem>
      <ToggleGrpItem value="c">C</ToggleGrpItem>
    </ToggleGrp>
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
    <ToggleGrp type="single" attached value="a" aria-label="Hover test">
      <ToggleGrpItem value="a">A</ToggleGrpItem>
      <ToggleGrpItem value="b">B</ToggleGrpItem>
      <ToggleGrpItem value="c">C</ToggleGrpItem>
    </ToggleGrp>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <ToggleGrp type="single" attached value="a" aria-label="Focus test">
      <ToggleGrpItem value="a">A</ToggleGrpItem>
      <ToggleGrpItem value="b">B</ToggleGrpItem>
      <ToggleGrpItem value="c">C</ToggleGrpItem>
    </ToggleGrp>
  ),
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  render: () => (
    <ToggleGrp type="single" attached value="a" aria-label="Active test">
      <ToggleGrpItem value="a">A</ToggleGrpItem>
      <ToggleGrpItem value="b">B</ToggleGrpItem>
      <ToggleGrpItem value="c">C</ToggleGrpItem>
    </ToggleGrp>
  ),
  parameters: { pseudo: { active: true } },
}
