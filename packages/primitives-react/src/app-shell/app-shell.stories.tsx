import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Shell, ShellHeader, ShellSidebar, ShellMain, ShellFooter } from "./app-shell.js"

const meta = {
  title: "Primitives/App Shell",
  tags: ["autodocs", "beta"],
  component: Shell,
  argTypes: {
    sidebarPosition: { control: "select", options: ["start", "end"] },
  },
  args: {},
} satisfies Meta<typeof Shell>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <Shell {...args} style={{ height: "400px", border: "1px solid #e2e8f0" }}>
      <ShellHeader sticky>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>Header</div>
      </ShellHeader>
      <ShellSidebar width="md">
        <div style={{ padding: "16px" }}>Sidebar</div>
      </ShellSidebar>
      <ShellMain>
        <div style={{ padding: "16px" }}>Main content area</div>
      </ShellMain>
      <ShellFooter>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0" }}>Footer</div>
      </ShellFooter>
    </Shell>
  ),
}

/** With sidebar on the end (right). */
export const SidebarEnd: Story = {
  args: { sidebarPosition: "end" },
  render: Playground.render,
}

/** With collapsed sidebar. */
export const CollapsedSidebar: Story = {
  args: { sidebarCollapsed: true },
  render: Playground.render,
}

/** With sidebar at start position (default). */
export const SidebarStart: Story = {
  args: { sidebarPosition: "start" },
  render: Playground.render,
}

export const Hover: Story = {
  render: Playground.render,
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: Playground.render,
  parameters: { pseudo: { focusVisible: true } },
}

export const RenderTest: Story = {
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvasElement.querySelector(".pm-shell")
    await expect(el).toBeTruthy()
  },
}
