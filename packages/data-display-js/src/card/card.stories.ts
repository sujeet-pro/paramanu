import type { Meta, StoryObj } from "@storybook/html"
import { cardClasses } from "./card.classes.js"
import type { CardClassesOptions } from "./card.types.js"

interface CardArgs extends CardClassesOptions {
  headerText: string
  bodyText: string
  footerText: string
}

function createCard(args: CardArgs): HTMLElement {
  const cls = cardClasses({
    variant: args.variant,
    size: args.size,
    interactive: args.interactive,
    fullWidth: args.fullWidth,
    horizontal: args.horizontal,
  })

  const card = document.createElement("div")
  card.className = cls.root

  if (args.headerText) {
    const header = document.createElement("div")
    header.className = cls.header
    header.textContent = args.headerText
    card.appendChild(header)
  }

  const body = document.createElement("div")
  body.className = cls.body
  body.textContent = args.bodyText
  card.appendChild(body)

  if (args.footerText) {
    const footer = document.createElement("div")
    footer.className = cls.footer
    footer.textContent = args.footerText
    card.appendChild(footer)
  }

  return card
}

const meta = {
  title: "Data Display/Card",
  tags: ["autodocs"],
  render: (args) => createCard(args as CardArgs),
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outline", "filled", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    interactive: { control: "boolean" },
    fullWidth: { control: "boolean" },
    horizontal: { control: "boolean" },
    headerText: { control: "text" },
    bodyText: { control: "text" },
    footerText: { control: "text" },
  },
  args: {
    variant: "elevated",
    size: "md",
    headerText: "Card Header",
    bodyText: "This is the card body content.",
    footerText: "Card Footer",
  },
} satisfies Meta<CardArgs>

export default meta
type Story = StoryObj<CardArgs>

export const Playground: Story = {}

export const Elevated: Story = {
  args: { variant: "elevated" },
}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Filled: Story = {
  args: { variant: "filled" },
}

export const Ghost: Story = {
  args: { variant: "ghost" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Interactive: Story = {
  args: { interactive: true },
}

export const FullWidth: Story = {
  args: { fullWidth: true },
}
