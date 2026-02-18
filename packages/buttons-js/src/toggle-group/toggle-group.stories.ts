import type { Meta, StoryObj } from "@storybook/html-vite"
import { toggleGroupClasses, toggleGroupItemClasses } from "./toggle-group.classes.js"
import type { ToggleGroupClassesOptions, ToggleGroupSize } from "./toggle-group.types.js"

interface ToggleGroupArgs extends ToggleGroupClassesOptions {
  type: "single" | "multiple"
  ariaLabel: string
  items: string[]
  activeIndex: number
}

function createToggleGroup(args: ToggleGroupArgs): HTMLDivElement {
  const group = document.createElement("div")
  group.className = toggleGroupClasses({
    orientation: args.orientation,
    size: args.size,
    attached: args.attached,
    fullWidth: args.fullWidth,
  })
  group.setAttribute("role", "group")
  group.setAttribute("aria-label", args.ariaLabel)
  group.dataset.type = args.type

  for (let i = 0; i < args.items.length; i++) {
    const button = document.createElement("button")
    const pressed = i === args.activeIndex
    button.className = toggleGroupItemClasses({
      size: args.size,
      pressed,
    })
    button.textContent = args.items[i]
    button.type = "button"
    button.setAttribute("aria-pressed", String(pressed))
    group.appendChild(button)
  }

  return group
}

const meta = {
  title: "Buttons/Toggle Group",
  tags: ["autodocs", "stable"],
  render: (args) => createToggleGroup(args as ToggleGroupArgs),
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
    ariaLabel: { control: "text" },
    activeIndex: { control: { type: "number", min: -1, max: 5 } },
  },
  args: {
    type: "single",
    orientation: "horizontal",
    size: "md",
    ariaLabel: "Alignment",
    items: ["Left", "Center", "Right"],
    activeIndex: 1,
  },
} satisfies Meta<ToggleGroupArgs>

export default meta
type Story = StoryObj<ToggleGroupArgs>

export const Playground: Story = {}

export const Single: Story = {
  args: { type: "single", activeIndex: 1 },
}

export const Multiple: Story = {
  args: { type: "multiple", items: ["B", "I", "U"], activeIndex: 0, ariaLabel: "Formatting" },
}

export const Vertical: Story = {
  args: { orientation: "vertical", items: ["Top", "Middle", "Bottom"], ariaLabel: "Position" },
}

export const Attached: Story = {
  args: { attached: true },
}

export const FullWidth: Story = {
  args: { fullWidth: true },
}

export const AllSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"

    const sizes: ToggleGroupSize[] = ["xs", "sm", "md", "lg", "xl"]
    for (const size of sizes) {
      container.appendChild(
        createToggleGroup({
          type: "single",
          size,
          attached: true,
          items: ["A", "B", "C"],
          activeIndex: 1,
          ariaLabel: `Size ${size}`,
          orientation: "horizontal",
        }),
      )
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

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
