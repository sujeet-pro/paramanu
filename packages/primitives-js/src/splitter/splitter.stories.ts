import type { Meta, StoryObj } from "@storybook/html-vite"
import { splitterClasses, splitterPanelClasses, splitterHandleClasses } from "./splitter.classes.js"
import type { SplitterClassesOptions } from "./splitter.types.js"

function createSplitter(args: SplitterClassesOptions): HTMLElement {
  const el = document.createElement("div")
  el.className = splitterClasses(args)
  el.style.height = "300px"
  el.style.border = "1px solid #e2e8f0"

  const panel1 = document.createElement("div")
  panel1.className = splitterPanelClasses({})
  panel1.style.width = "50%"
  panel1.innerHTML = '<div style="padding: 16px; height: 100%;">Left Panel</div>'

  const handle = document.createElement("div")
  handle.className = splitterHandleClasses({ orientation: args.orientation })
  handle.setAttribute("role", "separator")
  handle.tabIndex = 0

  const panel2 = document.createElement("div")
  panel2.className = splitterPanelClasses({})
  panel2.style.width = "50%"
  panel2.innerHTML = '<div style="padding: 16px; height: 100%;">Right Panel</div>'

  el.appendChild(panel1)
  el.appendChild(handle)
  el.appendChild(panel2)
  return el
}

const meta = {
  title: "Primitives/Splitter",
  tags: ["autodocs", "beta"],
  render: (args) => createSplitter(args as SplitterClassesOptions),
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
  },
  args: {},
} satisfies Meta<SplitterClassesOptions>

export default meta
type Story = StoryObj<SplitterClassesOptions>

export const Playground: Story = {}
export const Horizontal: Story = { args: { orientation: "horizontal" } }
export const Vertical: Story = { args: { orientation: "vertical" } }
export const Disabled: Story = { args: { disabled: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
