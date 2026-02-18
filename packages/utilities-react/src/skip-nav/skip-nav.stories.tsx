import type { Meta, StoryObj } from "@storybook/react"
import { SkipNav, SkipNavTarget } from "./skip-nav.js"

const meta = {
  title: "Utilities/SkipNav",
  component: SkipNav,
  tags: ["autodocs"],
  argTypes: {
    targetId: { control: "text" },
  },
  args: {
    targetId: "main-content",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <nav style={{ padding: "16px", background: "#f0f0f0" }}>Navigation bar</nav>
        <SkipNavTarget>
          <main style={{ padding: "16px" }}>Main content area</main>
        </SkipNavTarget>
      </div>
    ),
  ],
} satisfies Meta<typeof SkipNav>

export default meta
type Story = StoryObj<typeof SkipNav>

export const Playground: Story = {}
