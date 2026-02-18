import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { IconButton } from "./icon-button.js"

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const meta = {
  title: "Buttons/Icon Button",
  component: IconButton,
  tags: ["autodocs", "stable"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["square", "circle"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    active: { control: "boolean" },
  },
  args: {
    "aria-label": "Search",
    children: <SearchIcon />,
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Primary: Story = {
  args: { variant: "primary", "aria-label": "Search" },
}

export const Secondary: Story = {
  args: { variant: "secondary", "aria-label": "Search" },
}

export const Danger: Story = {
  args: { variant: "danger", "aria-label": "Delete" },
}

export const Ghost: Story = {
  args: { variant: "ghost", "aria-label": "Search" },
}

export const Outline: Story = {
  args: { variant: "outline", "aria-label": "Search" },
}

export const Square: Story = {
  args: { shape: "square", "aria-label": "Search" },
}

export const Circle: Story = {
  args: { shape: "circle", "aria-label": "Search" },
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["primary", "secondary", "danger", "ghost", "outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <IconButton key={size} variant={variant} size={size} aria-label={`${variant} ${size}`}>
              <SearchIcon />
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <IconButton key={size} size={size} aria-label={`${size} icon`}>
          <SearchIcon />
        </IconButton>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Disabled search" },
}

export const Loading: Story = {
  args: { loading: true, "aria-label": "Loading" },
}

export const Active: Story = {
  args: { active: true, "aria-label": "Active search" },
}

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <IconButton aria-label="Default">
        <SearchIcon />
      </IconButton>
      <IconButton disabled aria-label="Disabled">
        <SearchIcon />
      </IconButton>
      <IconButton loading aria-label="Loading">
        <SearchIcon />
      </IconButton>
      <IconButton active aria-label="Active">
        <SearchIcon />
      </IconButton>
    </div>
  ),
}

export const CircleShape: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["primary", "secondary", "danger", "ghost", "outline"] as const).map((variant) => (
        <IconButton key={variant} variant={variant} shape="circle" aria-label={variant}>
          <HeartIcon />
        </IconButton>
      ))}
    </div>
  ),
}

export const ClickHandler: Story = {
  args: {
    "aria-label": "Click me",
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const KeyboardInteraction: Story = {
  args: {
    "aria-label": "Press Enter",
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
    "aria-label": "Favorite item",
    children: <HeartIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Favorite item" })
    await expect(button).toBeInTheDocument()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const ActivePseudo: Story = {
  parameters: { pseudo: { active: true } },
}
