import type { Meta, StoryObj } from "@storybook/html-vite"
import { btnClasses } from "./button.classes.js"
import type { BtnClassesOptions, BtnVariant, BtnSize } from "./button.types.js"

interface BtnArgs extends BtnClassesOptions {
  label: string
}

function createBtn(args: BtnArgs): HTMLButtonElement {
  const button = document.createElement("button")
  button.className = btnClasses({
    variant: args.variant,
    size: args.size,
    disabled: args.disabled,
    fullWidth: args.fullWidth,
    loading: args.loading,
    active: args.active,
  })
  button.textContent = args.label
  button.type = "button"
  if (args.disabled) {
    button.disabled = true
    button.setAttribute("aria-disabled", "true")
  }
  if (args.loading) {
    button.setAttribute("aria-busy", "true")
  }
  return button
}

const meta = {
  title: "Btns/Btn",
  tags: ["autodocs", "beta"],
  render: (args) => createBtn(args as BtnArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "outline", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    active: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Btn",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<BtnArgs>

export default meta
type Story = StoryObj<BtnArgs>

export const Playground: Story = {}

export const Primary: Story = {
  args: { variant: "primary", label: "Primary" },
}

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
}

export const Danger: Story = {
  args: { variant: "danger", label: "Danger" },
}

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ghost" },
}

export const Outline: Story = {
  args: { variant: "outline", label: "Outline" },
}

export const Link: Story = {
  args: { variant: "link", label: "Link" },
}

export const AllVariantsAndSizes: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.flexDirection = "column"
    container.style.gap = "16px"

    const variants: BtnVariant[] = ["primary", "secondary", "danger", "ghost", "outline", "link"]
    const sizes: BtnSize[] = ["xs", "sm", "md", "lg", "xl"]

    for (const variant of variants) {
      const row = document.createElement("div")
      row.style.display = "flex"
      row.style.gap = "8px"
      row.style.alignItems = "center"

      for (const size of sizes) {
        row.appendChild(createBtn({ label: `${variant} ${size}`, variant, size }))
      }
      container.appendChild(row)
    }
    return container
  },
}

export const States: Story = {
  render: () => {
    const container = document.createElement("div")
    container.style.display = "flex"
    container.style.gap = "8px"
    container.style.flexWrap = "wrap"

    container.appendChild(createBtn({ label: "Default" }))
    container.appendChild(createBtn({ label: "Disabled", disabled: true }))
    container.appendChild(createBtn({ label: "Loading", loading: true }))
    container.appendChild(createBtn({ label: "Active", active: true }))
    return container
  },
}

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, label: "Full Width" },
}

export const Loading: Story = {
  args: { loading: true, label: "Loading" },
}

export const Active: Story = {
  args: { active: true, label: "Active" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", label: "Extra Small" },
}

export const Small: Story = {
  args: { size: "sm", label: "Small" },
}

export const Medium: Story = {
  args: { size: "md", label: "Medium" },
}

export const Large: Story = {
  args: { size: "lg", label: "Large" },
}

export const ExtraLarge: Story = {
  args: { size: "xl", label: "Extra Large" },
}

export const LongLabel: Story = {
  args: { label: "This is a button with a very long label that might wrap" },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  parameters: { pseudo: { active: true } },
}
