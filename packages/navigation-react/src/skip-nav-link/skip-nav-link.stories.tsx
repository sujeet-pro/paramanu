import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { SkipLink } from "./skip-nav-link.js"

const meta = {
  title: "Navigation/Skip Nav Link",
  component: SkipLink,
  tags: ["autodocs", "beta"],
  args: {
    href: "#main-content",
  },
} satisfies Meta<typeof SkipLink>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div>
      <SkipLink {...args} />
      <p>Tab to reveal the skip link.</p>
      <main id="main-content">
        <p>Main content area</p>
      </main>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div>
      <SkipLink />
      <main id="main-content">Content</main>
    </div>
  ),
}

export const CustomText: Story = {
  render: () => (
    <div>
      <SkipLink>Skip to content</SkipLink>
      <main id="main-content">Content</main>
    </div>
  ),
}

export const CustomTarget: Story = {
  render: () => (
    <div>
      <SkipLink href="#content-area">Skip to content area</SkipLink>
      <div id="content-area">Content area</div>
    </div>
  ),
}

export const FocusableOnTab: Story = {
  render: () => (
    <div>
      <SkipLink />
      <main id="main-content">Content</main>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByText("Skip to main content")
    await expect(link).toBeInTheDocument()
    await expect(link).toHaveAttribute("href", "#main-content")
  },
}

export const KeyboardActivation: Story = {
  render: () => (
    <div>
      <SkipLink />
      <main id="main-content">Content</main>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByText("Skip to main content")
    link.focus()
    await expect(link).toHaveFocus()
  },
}

export const Accessibility: Story = {
  render: () => (
    <div>
      <SkipLink />
      <main id="main-content">Content</main>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByText("Skip to main content")
    await expect(link).toHaveAttribute("href", "#main-content")
  },
}

export const Hover: Story = {
  render: () => (
    <div>
      <SkipLink />
      <main id="main-content">Content</main>
    </div>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <div>
      <SkipLink />
      <main id="main-content">Content</main>
    </div>
  ),
  parameters: { pseudo: { focusVisible: true } },
}
