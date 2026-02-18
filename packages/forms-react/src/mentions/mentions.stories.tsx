import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Mentions } from "./mentions.js"

const meta = {
  title: "Forms/Mentions",
  tags: ["autodocs", "stable"],
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
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
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

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    children: (
      <textarea
        className="pm-input pm-input--unstyled pm-input--md"
        placeholder="Unstyled mentions..."
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

export const Large: Story = {
  args: {
    size: "lg",
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--lg"
        placeholder="Large mentions..."
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

export const TypeInteraction: Story = {
  args: {
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Type @ to mention..."
        rows={3}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText("Type @ to mention...")
    await userEvent.type(textarea, "@john hello")
    await expect(textarea).toHaveValue("@john hello")
  },
}

export const KeyboardInteraction: Story = {
  args: {
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Tab to focus..."
        rows={3}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByPlaceholderText("Tab to focus...")
    await userEvent.tab()
    await expect(textarea).toHaveFocus()
  },
}

export const Accessibility: Story = {
  args: {
    "aria-label": "Mention teammates",
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Type @ to mention..."
        rows={3}
        aria-label="Mention teammates"
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("textbox", { name: "Mention teammates" })
    await expect(el).toBeInTheDocument()
  },
}

export const Hover: Story = {
  args: {
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Type @ to mention someone..."
        rows={3}
      />
    ),
  },
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  args: {
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Type @ to mention someone..."
        rows={3}
      />
    ),
  },
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  args: {
    children: (
      <textarea
        className="pm-input pm-input--outline pm-input--md"
        placeholder="Type @ to mention someone..."
        rows={3}
      />
    ),
  },
  parameters: { pseudo: { active: true } },
}
