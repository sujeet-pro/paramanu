import type { Meta, StoryObj } from "@storybook/html-vite"
import { aspectClasses } from "./aspect-ratio.classes.js"
import type { AspectClassesOptions } from "./aspect-ratio.types.js"

function createAspect(args: AspectClassesOptions): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.width = "400px"
  const el = document.createElement("div")
  el.className = aspectClasses(args)
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
  tags: ["autodocs", "beta"],
  render: (args) => createAspect(args as AspectClassesOptions),
  argTypes: {
    ratio: {
      control: "select",
      options: ["1/1", "2/3", "3/2", "4/3", "3/4", "16/9", "9/16", "21/9"],
    },
  },
  args: { ratio: "16/9" },
} satisfies Meta<AspectClassesOptions>

export default meta
type Story = StoryObj<AspectClassesOptions>

export const Playground: Story = {}
export const Square: Story = { args: { ratio: "1/1" } }
export const Portrait: Story = { args: { ratio: "3/4" } }
export const Ratio2By3: Story = { args: { ratio: "2/3" } }
export const Ratio3By2: Story = { args: { ratio: "3/2" } }
export const Ratio4By3: Story = { args: { ratio: "4/3" } }
export const Widescreen: Story = { args: { ratio: "16/9" } }
export const Portrait9By16: Story = { args: { ratio: "9/16" } }
export const Ultrawide: Story = { args: { ratio: "21/9" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
