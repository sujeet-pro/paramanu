import type { Meta, StoryObj } from "@storybook/html"
import { paginationClasses, paginationItemClasses } from "./pagination.classes.js"
import type { PaginationClassesOptions } from "./pagination.types.js"

interface PaginationArgs extends PaginationClassesOptions {}

function createPagination(args: PaginationArgs): HTMLElement {
  const nav = document.createElement("nav")
  nav.className = paginationClasses(args)
  nav.setAttribute("aria-label", "Pagination")

  const ul = document.createElement("ul")

  const prev = document.createElement("li")
  const prevBtn = document.createElement("button")
  prevBtn.className = paginationItemClasses({ type: "prev", disabled: true })
  prevBtn.textContent = "Prev"
  prevBtn.disabled = true
  prev.appendChild(prevBtn)
  ul.appendChild(prev)

  for (let i = 1; i <= 3; i++) {
    const li = document.createElement("li")
    const btn = document.createElement("button")
    btn.className = paginationItemClasses({ type: "page", active: i === 1 })
    btn.textContent = String(i)
    if (i === 1) btn.setAttribute("aria-current", "page")
    li.appendChild(btn)
    ul.appendChild(li)
  }

  const next = document.createElement("li")
  const nextBtn = document.createElement("button")
  nextBtn.className = paginationItemClasses({ type: "next" })
  nextBtn.textContent = "Next"
  next.appendChild(nextBtn)
  ul.appendChild(next)

  nav.appendChild(ul)
  return nav
}

const meta = {
  title: "Navigation/Pagination",
  tags: ["autodocs"],
  render: (args) => createPagination(args as PaginationArgs),
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "minimal"],
    },
  },
  args: {
    size: "md",
    variant: "default",
  },
} satisfies Meta<PaginationArgs>

export default meta
type Story = StoryObj<PaginationArgs>

export const Playground: Story = {}

export const Minimal: Story = {
  args: { variant: "minimal" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}
