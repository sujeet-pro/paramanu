import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { SkipNav, SkipNavTarget } from "./skip-nav.js"

const meta = {
  title: "Utilities/SkipNav",
  component: SkipNav,
  tags: ["autodocs", "beta"],
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

export const CustomTargetId: Story = {
  args: { targetId: "custom-main" },
}

export const A11yTest: Story = {
  play: async ({ canvasElement }) => {
    const link = canvasElement.querySelector("a")
    await expect(link).toBeTruthy()
    await expect(link?.getAttribute("href")).toBe("#main-content")
  },
}
