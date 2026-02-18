import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { TagsInput } from "./tags-input.js"

const meta = {
  title: "Forms/Tags Input",
  tags: ["autodocs", "stable"],
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
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
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

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    children: (
      <>
        <span className="pm-tag">Tag 1</span>
        <input className="pm-input pm-input--unstyled pm-input--md" placeholder="Add tag..." />
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

export const Large: Story = {
  args: {
    size: "lg",
    children: (
      <>
        <span className="pm-tag">Large</span>
        <input className="pm-input pm-input--outline pm-input--lg" placeholder="Add tag..." />
      </>
    ),
  },
}

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: (
      <>
        <span className="pm-tag">XS</span>
        <input className="pm-input pm-input--outline pm-input--xs" placeholder="Add tag..." />
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

export const AddTag: Story = {
  args: {
    onChange: fn(),
    children: (
      <>
        <span className="pm-tag">React</span>
        <input className="pm-input pm-input--outline pm-input--md" placeholder="Add tag..." />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Add tag...")
    await userEvent.type(input, "New Tag")
    await expect(input).toHaveValue("New Tag")
  },
}

export const KeyboardNavigation: Story = {
  args: {
    children: (
      <>
        <span className="pm-tag">Tag</span>
        <input className="pm-input pm-input--outline pm-input--md" placeholder="Add tag..." />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-tags-input")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: {
    children: (
      <>
        <span className="pm-tag">Tag</span>
        <input className="pm-input pm-input--outline pm-input--md" placeholder="Add tag..." />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group")
    await expect(group).toBeTruthy()
  },
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
