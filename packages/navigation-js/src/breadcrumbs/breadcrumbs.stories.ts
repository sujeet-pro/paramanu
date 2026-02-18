import type { Meta, StoryObj } from "@storybook/html"
import { breadcrumbsClasses, breadcrumbsItemClasses, breadcrumbsLinkClasses } from "./breadcrumbs.classes.js"
import type { BreadcrumbsClassesOptions } from "./breadcrumbs.types.js"

interface BreadcrumbsArgs extends BreadcrumbsClassesOptions {}

function createBreadcrumbs(args: BreadcrumbsArgs): HTMLElement {
  const nav = document.createElement("nav")
  nav.className = breadcrumbsClasses(args)
  nav.setAttribute("aria-label", "Breadcrumb")

  const ol = document.createElement("ol")

  const items = [
    { text: "Home", href: "#", active: false },
    { text: "Products", href: "#", active: false },
    { text: "Details", href: "", active: true },
  ]

  items.forEach((item) => {
    const li = document.createElement("li")
    li.className = breadcrumbsItemClasses({ active: item.active })

    if (item.active) {
      const span = document.createElement("span")
      span.setAttribute("aria-current", "page")
      span.textContent = item.text
      li.appendChild(span)
    } else {
      const a = document.createElement("a")
      a.className = breadcrumbsLinkClasses()
      a.href = item.href
      a.textContent = item.text
      li.appendChild(a)
    }

    ol.appendChild(li)
  })

  nav.appendChild(ol)
  return nav
}

const meta = {
  title: "Navigation/Breadcrumbs",
  tags: ["autodocs"],
  render: (args) => createBreadcrumbs(args as BreadcrumbsArgs),
  argTypes: {
    separator: {
      control: "select",
      options: ["slash", "chevron", "dot", "arrow"],
    },
  },
  args: {
    separator: "slash",
  },
} satisfies Meta<BreadcrumbsArgs>

export default meta
type Story = StoryObj<BreadcrumbsArgs>

export const Playground: Story = {}

export const Chevron: Story = {
  args: { separator: "chevron" },
}

export const Dot: Story = {
  args: { separator: "dot" },
}

export const Arrow: Story = {
  args: { separator: "arrow" },
}
