import type { Meta, StoryObj } from "@storybook/html-vite"
import { embedClasses } from "./embed.classes.js"
import type { EmbedClassesOptions } from "./embed.types.js"

function createEmbed(args: EmbedClassesOptions): HTMLElement {
  const cls = embedClasses(args)
  const root = document.createElement("div")
  root.className = cls.root
  const iframe = document.createElement("iframe")
  iframe.className = cls.iframe
  iframe.src = "about:blank"
  iframe.title = "Embedded content"
  root.appendChild(iframe)
  return root
}

const meta = {
  title: "Data Display/Embed",
  tags: ["autodocs", "stable"],
  render: (args) => createEmbed(args as EmbedClassesOptions),
  argTypes: {
    ratio: { control: "select", options: ["1/1", "4/3", "16/9", "21/9"] },
    fullWidth: { control: "boolean" },
  },
  args: { ratio: "16/9" },
} satisfies Meta<EmbedClassesOptions>

export default meta
type Story = StoryObj<EmbedClassesOptions>

export const Playground: Story = {}
export const Square: Story = { args: { ratio: "1/1" } }
export const FourThirds: Story = { args: { ratio: "4/3" } }
export const UltraWide: Story = { args: { ratio: "21/9" } }
export const FullWidth: Story = { args: { fullWidth: true } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
