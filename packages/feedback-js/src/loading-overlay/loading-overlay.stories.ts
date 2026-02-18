import type { Meta, StoryObj } from "@storybook/html"
import { loadingOverlayClasses } from "./loading-overlay.classes.js"
import type { LoadingOverlayClassesOptions } from "./loading-overlay.types.js"

function createLoadingOverlay(args: LoadingOverlayClassesOptions): HTMLDivElement {
  const classes = loadingOverlayClasses(args)

  const wrapper = document.createElement("div")
  wrapper.style.position = "relative"
  wrapper.style.height = "200px"
  wrapper.style.border = "1px solid #ccc"
  wrapper.style.padding = "16px"

  const content = document.createElement("p")
  content.textContent = "Content underneath the overlay."
  wrapper.appendChild(content)

  const overlay = document.createElement("div")
  overlay.className = classes.root
  overlay.setAttribute("aria-hidden", args.visible ? "false" : "true")

  const backdrop = document.createElement("div")
  backdrop.className = classes.backdrop
  overlay.appendChild(backdrop)

  const overlayContent = document.createElement("div")
  overlayContent.className = classes.content
  overlayContent.textContent = "Loading..."
  overlay.appendChild(overlayContent)

  wrapper.appendChild(overlay)
  return wrapper
}

const meta = {
  title: "Feedback/Loading Overlay",
  tags: ["autodocs"],
  render: (args) => createLoadingOverlay(args as LoadingOverlayClassesOptions),
  argTypes: {
    visible: { control: "boolean" },
    blur: { control: "boolean" },
  },
  args: { visible: true },
} satisfies Meta<LoadingOverlayClassesOptions>

export default meta
type Story = StoryObj<LoadingOverlayClassesOptions>

export const Playground: Story = {}
export const Visible: Story = { args: { visible: true } }
export const Hidden: Story = { args: { visible: false } }
export const WithBlur: Story = { args: { visible: true, blur: true } }
