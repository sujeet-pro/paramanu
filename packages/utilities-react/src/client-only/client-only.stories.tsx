import type { Meta, StoryObj } from "@storybook/react"
import { ClientOnly } from "./client-only.js"

const meta = {
  title: "Utilities/ClientOnly",
  component: ClientOnly,
  tags: ["autodocs"],
  args: {
    fallback: <div style={{ padding: "16px", background: "#f0f0f0" }}>Loading...</div>,
    children: (
      <div style={{ padding: "16px", background: "#e0ffe0" }}>
        Client-only content (rendered after hydration)
      </div>
    ),
  },
} satisfies Meta<typeof ClientOnly>

export default meta
type Story = StoryObj<typeof ClientOnly>

export const Playground: Story = {}

export const WithoutFallback: Story = {
  args: {
    fallback: undefined,
    children: <div style={{ padding: "16px" }}>Client content (no fallback)</div>,
  },
}
