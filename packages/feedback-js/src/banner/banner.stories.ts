import type { Meta, StoryObj } from "@storybook/html"
import { bannerClasses } from "./banner.classes.js"
import type { BannerClassesOptions, BannerVariant } from "./banner.types.js"

interface BannerArgs extends BannerClassesOptions {
  text: string
}

function createBanner(args: BannerArgs): HTMLDivElement {
  const classes = bannerClasses({
    variant: args.variant,
    sticky: args.sticky,
    dismissible: args.dismissible,
    position: args.position,
  })

  const el = document.createElement("div")
  el.className = classes.root
  el.setAttribute("role", "status")

  const content = document.createElement("div")
  content.className = classes.content
  content.textContent = args.text
  el.appendChild(content)

  if (args.dismissible) {
    const close = document.createElement("button")
    close.className = classes.close
    close.type = "button"
    close.setAttribute("aria-label", "Close")
    close.textContent = "\u00d7"
    close.addEventListener("click", () => el.remove())
    el.appendChild(close)
  }

  return el
}

const meta = {
  title: "Feedback/Banner",
  tags: ["autodocs"],
  render: (args) => createBanner(args as BannerArgs),
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
    sticky: { control: "boolean" },
    dismissible: { control: "boolean" },
    position: { control: "select", options: ["top", "bottom"] },
    text: { control: "text" },
  },
  args: {
    variant: "info",
    text: "This is a banner message.",
  },
} satisfies Meta<BannerArgs>

export default meta
type Story = StoryObj<BannerArgs>

export const Playground: Story = {}

export const AllVariants: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "8px"
    const variants: BannerVariant[] = ["info", "success", "warning", "danger"]
    for (const variant of variants) {
      container.appendChild(createBanner({ variant, text: `${variant} banner.` }))
    }
    return container
  },
}

export const Dismissible: Story = { args: { dismissible: true, text: "Dismissible banner." } }
export const Sticky: Story = { args: { sticky: true, text: "Sticky banner." } }
