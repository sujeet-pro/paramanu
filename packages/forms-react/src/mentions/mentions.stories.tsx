import type { Meta, StoryObj } from "@storybook/react"
import { Mentions } from "./mentions.js"

const meta = {
  title: "Forms/Mentions",
  tags: ["autodocs"],
  component: Mentions,
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
  },
  args: {},
} satisfies Meta<typeof Mentions>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Type @ to mention someone..."
        rows={3}
      />
    ),
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Outline mentions..."
        rows={3}
      />
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: "filled",
    children: (
      <textarea
        className="pm-input pm-input--filled pm-input--md"
        placeholder="Filled mentions..."
        rows={3}
      />
    ),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--sm"
        placeholder="Small mentions..."
        rows={3}
      />
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Disabled mentions..."
        rows={3}
        disabled
      />
    ),
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Invalid mentions..."
        rows={3}
      />
    ),
  },
}
