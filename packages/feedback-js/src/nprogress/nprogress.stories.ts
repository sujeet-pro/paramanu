import type { Meta, StoryObj } from "@storybook/html-vite"
import { nprogressClasses } from "./nprogress.classes.js"
import type { NProgressClassesOptions } from "./nprogress.types.js"

interface NProgressArgs extends NProgressClassesOptions {
  value: number
}

function createNProgress(args: NProgressArgs): HTMLDivElement {
  const classes = nprogressClasses({ active: args.active })
  const barWidth = `${(args.value ?? 0) * 100}%`

  const el = document.createElement("div")
  el.className = classes.root
  el.setAttribute("role", "progressbar")
  el.setAttribute("aria-valuenow", String(Math.round((args.value ?? 0) * 100)))
  el.setAttribute("aria-valuemin", "0")
  el.setAttribute("aria-valuemax", "100")

  const bar = document.createElement("div")
  bar.className = classes.bar
  bar.style.width = barWidth

  const peg = document.createElement("div")
  peg.className = classes.peg
  bar.appendChild(peg)

  el.appendChild(bar)
  return el
}

const meta = {
  title: "Feedback/NProgress",
  tags: ["autodocs", "stable"],
  render: (args) => createNProgress(args as NProgressArgs),
  argTypes: {
    active: { control: "boolean" },
    value: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
  args: { active: true, value: 0.3 },
} satisfies Meta<NProgressArgs>

export default meta
type Story = StoryObj<NProgressArgs>

export const Playground: Story = {}
export const Active: Story = { args: { active: true, value: 0.4 } }
export const Inactive: Story = { args: { active: false, value: 0 } }
export const HalfProgress: Story = { args: { active: true, value: 0.5 } }
export const Complete: Story = { args: { active: false, value: 1 } }

export const States: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "24px"

    const values = [0.3, 0.7, 1]
    const labels = ["Active (30%)", "Active (70%)", "Complete"]
    for (let i = 0; i < values.length; i++) {
      const wrapper = document.createElement("div")
      const p = document.createElement("p")
      p.textContent = labels[i]
      p.style.marginBottom = "4px"
      wrapper.appendChild(p)
      wrapper.appendChild(createNProgress({ active: values[i] < 1, value: values[i] }))
      container.appendChild(wrapper)
    }
    return container
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActivePseudo: Story = {
  parameters: { pseudo: { active: true } },
}
