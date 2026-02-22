import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Btn } from "./button.js"

const meta = {
  title: "Btns/Btn",
  component: Btn,
  tags: ["autodocs", "beta"],
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
    loadingText: { control: "text" },
    spinnerPlacement: {
      control: "select",
      options: ["start", "end"],
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
  },
  args: {
    children: "Btn",
    variant: "primary",
    size: "md",
    onClick: fn(),
  },
} satisfies Meta<typeof Btn>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story with all controls exposed. */
export const Playground: Story = {
  args: {
    children: "Btn",
  },
}

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
}

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
}

export const Danger: Story = {
  args: { variant: "danger", children: "Danger" },
}

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
}

export const Link: Story = {
  args: { variant: "link", children: "Link" },
}

export const ExtraSmall: Story = {
  args: { size: "xs", children: "Extra Small" },
}

export const Small: Story = {
  args: { size: "sm", children: "Small" },
}

export const Medium: Story = {
  args: { size: "md", children: "Medium" },
}

export const Large: Story = {
  args: { size: "lg", children: "Large" },
}

export const ExtraLarge: Story = {
  args: { size: "xl", children: "Extra Large" },
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["primary", "secondary", "danger", "ghost", "outline", "link"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <Btn key={size} variant={variant} size={size}>
              {variant} {size}
            </Btn>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
}

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full Width" },
}

export const Active: Story = {
  args: { active: true, children: "Active" },
}

export const Loading: Story = {
  args: { loading: true, children: "Loading" },
}

export const LoadingWithText: Story = {
  args: { loading: true, loadingText: "Saving..." },
}

export const LoadingSpinnerEnd: Story = {
  args: { loading: true, loadingText: "Saving...", spinnerPlacement: "end" },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Btn>Default</Btn>
      <Btn disabled>Disabled</Btn>
      <Btn loading>Loading</Btn>
      <Btn loading loadingText="Saving...">
        Save
      </Btn>
      <Btn active>Active</Btn>
    </div>
  ),
}

export const WithLeftIcon: Story = {
  args: {
    children: "Search",
    leftIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
}

export const WithRightIcon: Story = {
  args: {
    children: "Next",
    rightIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
  },
}

export const LongLabel: Story = {
  args: { children: "This is a button with a very long label that might wrap" },
}

export const ClickHandler: Story = {
  args: {
    children: "Click me",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const DisabledClick: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button).toBeDisabled()
  },
}

export const KeyboardInteraction: Story = {
  args: {
    children: "Press Enter",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    button.focus()
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Accessibility: Story = {
  args: {
    children: "Accessible Btn",
    "aria-label": "Perform action",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Perform action" })
    await expect(button).toBeInTheDocument()
  },
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
