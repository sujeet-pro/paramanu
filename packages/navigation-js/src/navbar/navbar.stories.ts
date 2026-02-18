import type { Meta, StoryObj } from "@storybook/html"
import { navbarClasses, navbarInnerClasses, navbarSectionClasses, navbarBrandClasses, navbarToggleClasses } from "./navbar.classes.js"
import type { NavbarClassesOptions } from "./navbar.types.js"

interface NavbarArgs extends NavbarClassesOptions {
  brandText: string
}

function createNavbar(args: NavbarArgs): HTMLElement {
  const nav = document.createElement("nav")
  nav.className = navbarClasses({ variant: args.variant, position: args.position })

  const inner = document.createElement("div")
  inner.className = navbarInnerClasses()

  const startSection = document.createElement("div")
  startSection.className = navbarSectionClasses({ align: "start" })

  const brand = document.createElement("div")
  brand.className = navbarBrandClasses()
  brand.textContent = args.brandText
  startSection.appendChild(brand)

  const endSection = document.createElement("div")
  endSection.className = navbarSectionClasses({ align: "end" })

  const toggle = document.createElement("button")
  toggle.className = navbarToggleClasses()
  toggle.type = "button"
  toggle.textContent = "Menu"
  toggle.setAttribute("aria-label", "Toggle menu")
  endSection.appendChild(toggle)

  inner.appendChild(startSection)
  inner.appendChild(endSection)
  nav.appendChild(inner)

  return nav
}

const meta = {
  title: "Navigation/Navbar",
  tags: ["autodocs"],
  render: (args) => createNavbar(args as NavbarArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "floating", "bordered"],
    },
    position: {
      control: "select",
      options: ["static", "sticky", "fixed"],
    },
    brandText: { control: "text" },
  },
  args: {
    variant: "default",
    position: "static",
    brandText: "Brand",
  },
} satisfies Meta<NavbarArgs>

export default meta
type Story = StoryObj<NavbarArgs>

export const Playground: Story = {}

export const Floating: Story = {
  args: { variant: "floating" },
}

export const Bordered: Story = {
  args: { variant: "bordered" },
}

export const Sticky: Story = {
  args: { position: "sticky" },
}
