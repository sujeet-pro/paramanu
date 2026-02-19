import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible.js"

const meta = {
  title: "Disclosure/Collapsible",
  component: Collapsible,
  tags: ["autodocs", "beta"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    defaultOpen: false,
    onOpenChange: fn(),
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
      <CollapsibleContent>
        <p>This content can be expanded and collapsed.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Open by Default</CollapsibleTrigger>
      <CollapsibleContent>
        <p>This starts open.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const DefaultClosed: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Click to Open</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Hidden content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Cannot Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <p>This will not expand.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Small: Story = {
  args: { size: "sm", defaultOpen: true },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Small</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Small size content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Large: Story = {
  args: { size: "lg", defaultOpen: true },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Large</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Large size content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const InteractiveToggle: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Toggled content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Toggle" })
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
  },
}

export const KeyboardInteraction: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Press Enter</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Keyboard toggled.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Press Enter" })
    trigger.focus()
    await userEvent.keyboard("{Enter}")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
  },
}

export const Accessibility: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Accessible Trigger</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Accessible content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Accessible Trigger" })
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
  },
}

export const Hover: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Hover test</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Focus test</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Active test</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: { pseudo: { active: true } },
}
