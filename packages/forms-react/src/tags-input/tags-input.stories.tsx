import type { Meta, StoryObj } from "@storybook/react"
import { TagsInput } from "./tags-input.js"

const meta = {
  title: "Forms/Tags Input",
  tags: ["autodocs"],
  component: TagsInput,
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
} satisfies Meta<typeof TagsInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <span className="pm-tag">React</span>
        <span className="pm-tag">Vue</span>
        <input className="pm-input pm-input--outline pm-input--md" placeholder="Add tag..." />
      </>
    ),
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <span className="pm-tag">Tag 1</span>
        <input className="pm-input pm-input--outline pm-input--md" placeholder="Add tag..." />
      </>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: "filled",
    children: (
      <>
        <span className="pm-tag">Tag 1</span>
        <input className="pm-input pm-input--filled pm-input--md" placeholder="Add tag..." />
      </>
    ),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <span className="pm-tag">Small</span>
        <input className="pm-input pm-input--outline pm-input--sm" placeholder="Add tag..." />
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <span className="pm-tag">Disabled</span>
        <input className="pm-input pm-input--outline pm-input--md" placeholder="Add tag..." disabled />
      </>
    ),
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    children: (
      <>
        <span className="pm-tag">Invalid</span>
        <input className="pm-input pm-input--outline pm-input--md" placeholder="Add tag..." />
      </>
    ),
  },
}
