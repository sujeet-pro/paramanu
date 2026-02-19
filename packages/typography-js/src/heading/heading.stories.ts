import type { Meta, StoryObj } from "@storybook/html-vite"
import { headingClasses } from "./heading.classes.js"
import type { HeadingClassesOptions } from "./heading.types.js"

function createHeading(args: HeadingClassesOptions): HTMLElement {
  const level = args.level ?? 2
  const el = document.createElement(`h${level}`)
  el.className = headingClasses(args)
  el.textContent = "Section Heading"
  return el
}

const meta = {
  title: "Typography/Heading",
  tags: ["autodocs", "beta"],
  render: (args) => createHeading(args as HeadingClassesOptions),
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
    align: { control: "select", options: ["left", "center", "right"] },
    color: {
      control: "select",
      options: ["default", "muted", "dimmed", "primary", "danger", "success", "warning", "info"],
    },
    truncate: { control: "boolean" },
  },
  args: { level: 2 },
} satisfies Meta<HeadingClassesOptions>

export default meta
type Story = StoryObj<HeadingClassesOptions>

export const Playground: Story = {}
export const H1: Story = { args: { level: 1 } }
export const H2: Story = { args: { level: 2 } }
export const H3: Story = { args: { level: 3 } }
export const H4: Story = { args: { level: 4 } }
export const H5: Story = { args: { level: 5 } }
export const H6: Story = { args: { level: 6 } }
export const SizeXs: Story = { args: { size: "xs" } }
export const SizeSm: Story = { args: { size: "sm" } }
export const SizeMd: Story = { args: { size: "md" } }
export const SizeLg: Story = { args: { size: "lg" } }
export const SizeXl: Story = { args: { size: "xl" } }
export const Size2xl: Story = { args: { size: "2xl" } }
export const Size3xl: Story = { args: { size: "3xl" } }
export const WeightNormal: Story = { args: { weight: "normal" } }
export const WeightMedium: Story = { args: { weight: "medium" } }
export const WeightSemibold: Story = { args: { weight: "semibold" } }
export const Centered: Story = { args: { align: "center" } }
export const AlignRight: Story = { args: { align: "right" } }
export const LineHeightTight: Story = { args: { lineHeight: "tight" } }
export const LineHeightRelaxed: Story = { args: { lineHeight: "relaxed" } }
export const Truncated: Story = { args: { truncate: true } }
export const Primary: Story = { args: { color: "primary" } }
export const ColorMuted: Story = { args: { color: "muted" } }
export const ColorDimmed: Story = { args: { color: "dimmed" } }
export const ColorDanger: Story = { args: { color: "danger" } }
export const ColorSuccess: Story = { args: { color: "success" } }
export const ColorWarning: Story = { args: { color: "warning" } }
export const ColorInfo: Story = { args: { color: "info" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
