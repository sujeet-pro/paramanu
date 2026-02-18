import type { Meta, StoryObj } from "@storybook/html"
import { truncateClasses } from "./truncate.classes.js"
import type { TruncateClassesOptions } from "./truncate.types.js"

function createTruncate(args: TruncateClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = truncateClasses(args)
  el.style.width = "300px"
  el.textContent =
    "This is a very long text that is meant to demonstrate the truncation behavior. It should overflow and be cut off with an ellipsis."
  return el
}

const meta = {
  title: "Typography/Truncate",
  tags: ["autodocs"],
  render: (args) => createTruncate(args as TruncateClassesOptions),
  argTypes: {
    lines: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    position: { control: "select", options: ["end", "start", "middle"] },
  },
  args: { lines: 1 },
} satisfies Meta<TruncateClassesOptions>

export default meta
type Story = StoryObj<TruncateClassesOptions>

export const Playground: Story = {}
export const ThreeLines: Story = { args: { lines: 3 } }
export const StartPosition: Story = { args: { position: "start" } }
export const MiddlePosition: Story = { args: { position: "middle" } }
