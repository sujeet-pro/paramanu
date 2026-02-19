import type { Meta, StoryObj } from "@storybook/html-vite"
import { searchClasses } from "./search-input.classes.js"
import { inputClasses } from "../input/input.classes.js"
import type { SearchClassesOptions } from "./search-input.types.js"

interface SearchArgs extends SearchClassesOptions {
  placeholder: string
}

function createSearch(args: SearchArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = searchClasses({
    variant: args.variant,
    size: args.size,
    invalid: args.invalid,
    disabled: args.disabled,
    fullWidth: args.fullWidth,
  })
  wrapper.setAttribute("role", "search")

  const icon = document.createElement("span")
  icon.className = "pm-search__icon"
  icon.setAttribute("aria-hidden", "true")
  icon.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'

  const input = document.createElement("input")
  input.type = "search"
  input.className = inputClasses({ variant: args.variant, size: args.size })
  input.placeholder = args.placeholder || ""
  if (args.disabled) {
    input.disabled = true
    input.setAttribute("aria-disabled", "true")
  }
  if (args.invalid) input.setAttribute("aria-invalid", "true")

  wrapper.appendChild(icon)
  wrapper.appendChild(input)
  return wrapper
}

const meta = {
  title: "Forms/Search Input",
  tags: ["autodocs", "beta"],
  render: (args) => createSearch(args as SearchArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "unstyled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Search...",
    variant: "outline",
    size: "md",
  },
} satisfies Meta<SearchArgs>

export default meta
type Story = StoryObj<SearchArgs>

export const Playground: Story = {}

export const Outline: Story = {
  args: { variant: "outline", placeholder: "Search outline..." },
}

export const Filled: Story = {
  args: { variant: "filled", placeholder: "Search filled..." },
}

export const Unstyled: Story = {
  args: { variant: "unstyled", placeholder: "Search unstyled..." },
}

export const Small: Story = {
  args: { size: "sm", placeholder: "Search small..." },
}

export const Large: Story = {
  args: { size: "lg", placeholder: "Search large..." },
}

export const ExtraSmall: Story = {
  args: { size: "xs", placeholder: "Search extra small..." },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Search disabled..." },
}

export const Invalid: Story = {
  args: { invalid: true, placeholder: "Search invalid..." },
}

export const FullWidth: Story = {
  args: { fullWidth: true, placeholder: "Search full width..." },
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
