import type { Meta, StoryObj } from "@storybook/html"
import { aspectRatioClasses } from "./aspect-ratio.classes.js"
import type { AspectRatioClassesOptions } from "./aspect-ratio.types.js"

function createAspectRatio(args: AspectRatioClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.width = "400px"
  const el = document.createElement("div")
  el.className = aspectRatioClasses(args)
  const inner = document.createElement("div")
  inner.style.background = "#e2e8f0"
  inner.style.width = "100%"
  inner.style.height = "100%"
  inner.style.display = "flex"
  inner.style.alignItems = "center"
  inner.style.justifyContent = "center"
  inner.textContent = args.ratio || "16/9"
  el.appendChild(inner)
  wrapper.appendChild(el)
  return wrapper
}

const meta = {
  title: "Primitives/Aspect Ratio",
  tags: ["autodocs"],
  render: (args) => createAspectRatio(args as AspectRatioClassesOptions),
  argTypes: {
    ratio: { control: "select", options: ["1/1", "2/3", "3/2", "4/3", "3/4", "16/9", "9/16", "21/9"] },
  },
  args: { ratio: "16/9" },
} satisfies Meta<AspectRatioClassesOptions>

export default meta
type Story = StoryObj<AspectRatioClassesOptions>

export const Playground: Story = {}
export const Square: Story = { args: { ratio: "1/1" } }
export const Portrait: Story = { args: { ratio: "3/4" } }
