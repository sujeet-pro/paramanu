import type { Meta, StoryObj } from "@storybook/html"
import { sliderClasses } from "./slider.classes.js"
import type { SliderClassesOptions } from "./slider.types.js"

type SliderArgs = SliderClassesOptions

function createSlider(args: SliderArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = sliderClasses(args)
  el.role = "slider"
  el.setAttribute("aria-valuemin", "0")
  el.setAttribute("aria-valuemax", "100")
  el.setAttribute("aria-orientation", args.orientation || "horizontal")
  if (args.disabled) el.setAttribute("aria-disabled", "true")
  else el.tabIndex = 0
  return el
}

const meta = {
  title: "Forms/Slider",
  tags: ["autodocs"],
  render: (args) => createSlider(args as SliderArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
    showMarks: { control: "boolean" },
  },
  args: { size: "md", orientation: "horizontal" },
} satisfies Meta<SliderArgs>

export default meta
type Story = StoryObj<SliderArgs>

export const Playground: Story = {}
export const Vertical: Story = { args: { orientation: "vertical" } }
export const WithMarks: Story = { args: { showMarks: true } }
export const Disabled: Story = { args: { disabled: true } }
