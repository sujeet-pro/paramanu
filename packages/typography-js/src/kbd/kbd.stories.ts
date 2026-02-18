import type { Meta, StoryObj } from "@storybook/html"
import { kbdClasses } from "./kbd.classes.js"
import type { KbdClassesOptions } from "./kbd.types.js"

function createKbd(args: KbdClassesOptions): HTMLElement {
  const el = document.createElement("kbd")
  el.className = kbdClasses(args)
  el.textContent = "Ctrl"
  return el
}

const meta = {
  title: "Typography/Kbd",
  tags: ["autodocs"],
  render: (args) => createKbd(args as KbdClassesOptions),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outline", "subtle"] },
  },
  args: {},
} satisfies Meta<KbdClassesOptions>

export default meta
type Story = StoryObj<KbdClassesOptions>

export const Playground: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Outline: Story = { args: { variant: "outline" } }
export const Subtle: Story = { args: { variant: "subtle" } }
