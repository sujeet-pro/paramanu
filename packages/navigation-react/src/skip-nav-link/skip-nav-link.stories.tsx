import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { SkipNavLink } from "./skip-nav-link.js"

const meta = {
  title: "Navigation/Skip Nav Link",
  component: SkipNavLink,
  tags: ["autodocs"],
  args: {
    href: "#main-content",
  },
} satisfies Meta<typeof SkipNavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div>
      <SkipNavLink {...args} />
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
      <SkipNavLink />
      <main id="main-content">Content</main>
    </div>
  ),
}

export const CustomText: Story = {
  render: () => (
    <div>
      <SkipNavLink>Skip to content</SkipNavLink>
      <main id="main-content">Content</main>
    </div>
  ),
}

export const CustomTarget: Story = {
  render: () => (
    <div>
      <SkipNavLink href="#content-area">Skip to content area</SkipNavLink>
      <div id="content-area">Content area</div>
    </div>
  ),
}

export const FocusableOnTab: Story = {
  render: () => (
    <div>
      <SkipNavLink />
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
