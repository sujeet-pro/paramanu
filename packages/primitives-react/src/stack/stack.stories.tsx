import type { Meta, StoryObj } from "@storybook/react"
import { Stack, HStack, VStack } from "./stack.js"

const meta = {
  title: "Primitives/Stack",
  tags: ["autodocs"],
  component: Stack,
  argTypes: {
    direction: { control: "select", options: ["vertical", "horizontal"] },
    gap: { control: "select", options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] },
    separator: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const items = (
  <>
    <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Item 1</div>
    <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Item 2</div>
    <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>Item 3</div>
  </>
)

/** The default playground story with all controls exposed. */
export const Playground: Story = {
  args: { gap: "4", children: items },
}

/** Vertical stack (default). */
export const Vertical: Story = {
  args: { direction: "vertical", gap: "4", children: items },
}

/** Horizontal stack. */
export const Horizontal: Story = {
  args: { direction: "horizontal", gap: "4", children: items },
}

/** Stack with separator dividers between items. */
export const WithSeparator: Story = {
  args: { gap: "4", separator: true, children: items },
}

/** HStack shorthand for horizontal layout. */
export const HStackExample: Story = {
  render: () => (
    <HStack gap="4">
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>A</div>
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>B</div>
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>C</div>
    </HStack>
  ),
}

/** VStack shorthand for vertical layout. */
export const VStackExample: Story = {
  render: () => (
    <VStack gap="4">
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>A</div>
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>B</div>
      <div style={{ background: "#e2e8f0", padding: "8px 16px" }}>C</div>
    </VStack>
  ),
}

/** Stack with center alignment. */
export const CenterAligned: Story = {
  args: { gap: "4", align: "center", children: items },
}
