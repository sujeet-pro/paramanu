import type { Meta, StoryObj } from "@storybook/html-vite"
import {
  commandPaletteClasses,
  commandPaletteInputClasses,
  commandPaletteListClasses,
  commandPaletteItemClasses,
  commandPaletteGroupClasses,
  commandPaletteEmptyClasses,
} from "./command-palette.classes.js"

function createCommandPalette(): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.maxWidth = "480px"

  const palette = document.createElement("div")
  palette.className = commandPaletteClasses()

  const input = document.createElement("input")
  input.className = commandPaletteInputClasses()
  input.setAttribute("role", "combobox")
  input.setAttribute("aria-expanded", "true")
  input.setAttribute("aria-autocomplete", "list")
  input.placeholder = "Type a command..."
  palette.appendChild(input)

  const list = document.createElement("div")
  list.className = commandPaletteListClasses()
  list.setAttribute("role", "listbox")

  const group = document.createElement("div")
  group.className = commandPaletteGroupClasses()
  group.setAttribute("role", "group")

  const items = ["New File", "Open File", "Save"]
  items.forEach((text, i) => {
    const item = document.createElement("div")
    item.className = commandPaletteItemClasses({ active: i === 2 })
    item.setAttribute("role", "option")
    item.textContent = text
    group.appendChild(item)
  })

  list.appendChild(group)
  palette.appendChild(list)
  wrapper.appendChild(palette)
  return wrapper
}

function createEmptyPalette(): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.style.maxWidth = "480px"

  const palette = document.createElement("div")
  palette.className = commandPaletteClasses()

  const input = document.createElement("input")
  input.className = commandPaletteInputClasses()
  input.placeholder = "Type a command..."
  palette.appendChild(input)

  const list = document.createElement("div")
  list.className = commandPaletteListClasses()

  const empty = document.createElement("div")
  empty.className = commandPaletteEmptyClasses()
  empty.textContent = "No results found."
  list.appendChild(empty)

  palette.appendChild(list)
  wrapper.appendChild(palette)
  return wrapper
}

const meta = {
  title: "Overlays/CommandPalette",
  tags: ["autodocs", "stable"],
} satisfies Meta

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: () => createCommandPalette(),
}

export const Empty: Story = {
  render: () => createEmptyPalette(),
}

export const Hover: Story = {
  render: () => createCommandPalette(),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => createCommandPalette(),
  parameters: { pseudo: { focusVisible: true } },
}
