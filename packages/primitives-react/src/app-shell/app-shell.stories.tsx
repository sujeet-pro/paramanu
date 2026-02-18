import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { AppShell, AppShellHeader, AppShellSidebar, AppShellMain, AppShellFooter } from "./app-shell.js"

const meta = {
  title: "Primitives/App Shell",
  tags: ["autodocs", "stable"],
  component: AppShell,
  argTypes: {
    sidebarPosition: { control: "select", options: ["start", "end"] },
  },
  args: {},
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <AppShell {...args} style={{ height: "400px", border: "1px solid #e2e8f0" }}>
      <AppShellHeader sticky>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>Header</div>
      </AppShellHeader>
      <AppShellSidebar width="md">
        <div style={{ padding: "16px" }}>Sidebar</div>
      </AppShellSidebar>
      <AppShellMain>
        <div style={{ padding: "16px" }}>Main content area</div>
      </AppShellMain>
      <AppShellFooter>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0" }}>Footer</div>
      </AppShellFooter>
    </AppShell>
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
    const el = canvasElement.querySelector(".pm-app-shell")
    await expect(el).toBeTruthy()
  },
}
