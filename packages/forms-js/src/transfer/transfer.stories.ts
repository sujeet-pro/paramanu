import type { Meta, StoryObj } from "@storybook/html-vite"
import { transferClasses } from "./transfer.classes.js"
import type { TransferClassesOptions } from "./transfer.types.js"

type TransferArgs = TransferClassesOptions

function createTransfer(args: TransferArgs): HTMLElement {
  const el = document.createElement("div")
  el.className = transferClasses(args)
  el.role = "group"
  el.setAttribute("aria-label", "Transfer")
  if (args.disabled) el.setAttribute("aria-disabled", "true")
  el.textContent = "Transfer content"
  return el
}

const meta = {
  title: "Forms/Transfer",
  tags: ["autodocs", "beta"],
  render: (args) => createTransfer(args as TransferArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<TransferArgs>

export default meta
type Story = StoryObj<TransferArgs>

export const Playground: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraSmall: Story = { args: { size: "xs" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
