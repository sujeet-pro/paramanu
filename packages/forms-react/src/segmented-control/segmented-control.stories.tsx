import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { SegmentedControl } from "./segmented-control.js"

const meta = {
  title: "Forms/Segmented Control",
  tags: ["autodocs", "stable"],
  component: SegmentedControl,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">Day</button>
        <button type="button" className="pm-segmented-control__item">Week</button>
        <button type="button" className="pm-segmented-control__item">Month</button>
      </>
    ),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">List</button>
        <button type="button" className="pm-segmented-control__item">Grid</button>
      </>
    ),
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">All</button>
        <button type="button" className="pm-segmented-control__item">Active</button>
        <button type="button" className="pm-segmented-control__item">Completed</button>
      </>
    ),
  },
}

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">A</button>
        <button type="button" className="pm-segmented-control__item">B</button>
      </>
    ),
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">Tab 1</button>
        <button type="button" className="pm-segmented-control__item">Tab 2</button>
        <button type="button" className="pm-segmented-control__item">Tab 3</button>
      </>
    ),
  },
}

export const ClickSegment: Story = {
  args: {
    onChange: fn(),
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">A</button>
        <button type="button" className="pm-segmented-control__item">B</button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole("button")
    await userEvent.click(buttons[1])
  },
}

export const KeyboardNavigation: Story = {
  args: {
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">A</button>
        <button type="button" className="pm-segmented-control__item">B</button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-segmented-control")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: {
    children: (
      <>
        <button type="button" className="pm-segmented-control__item" aria-pressed="true">A</button>
        <button type="button" className="pm-segmented-control__item">B</button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("radiogroup")
    await expect(group).toBeTruthy()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
