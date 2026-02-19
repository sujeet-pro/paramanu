import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { SrOnly } from "./visually-hidden.js"

const meta = {
  title: "Utilities/SrOnly",
  component: SrOnly,
  tags: ["autodocs", "beta"],
  argTypes: {
    focusable: { control: "boolean" },
    as: { control: "select", options: ["span", "div", "a"] },
  },
  args: {
    children: "This text is only visible to screen readers",
  },
} satisfies Meta<typeof SrOnly>

export default meta
type Story = StoryObj<typeof SrOnly>

export const Playground: Story = {}

export const Focusable: Story = {
  args: { focusable: true, as: "a", children: "Skip to content" },
}

export const AsDiv: Story = {
  args: { as: "div", children: "Hidden div content" },
}

export const A11yScreenReaderText: Story = {
  args: { children: "Screen reader only text" },
  play: async ({ canvasElement }) => {
    const hidden = canvasElement.querySelector("span")
    await expect(hidden).toBeTruthy()
    await expect(hidden?.textContent).toBe("Screen reader only text")
  },
}

export const RenderTest: Story = {
  args: { children: "Test content" },
  play: async ({ canvasElement }) => {
    const text = canvasElement.textContent
    await expect(text).toContain("Test content")
  },
}
