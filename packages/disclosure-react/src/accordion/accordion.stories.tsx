import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionIcon } from "./accordion.js"

const meta = {
  title: "Disclosure/Accordion",
  component: Accordion,
  tags: ["autodocs", "stable"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "separated", "filled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    collapsible: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
    type: "single",
    collapsible: false,
    onValueChange: fn(),
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Section 1
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionContent>Content for section 1.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Section 2
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionContent>Content for section 2.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Section 3
          <AccordionIcon />
        </AccordionTrigger>
        <AccordionContent>Content for section 3.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Default: Story = {
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Open Section<AccordionIcon /></AccordionTrigger>
        <AccordionContent>This section is open by default.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Closed Section<AccordionIcon /></AccordionTrigger>
        <AccordionContent>This section is closed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Bordered: Story = {
  args: { variant: "bordered" },
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Bordered 1<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Bordered content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Bordered 2<AccordionIcon /></AccordionTrigger>
        <AccordionContent>More content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Separated: Story = {
  args: { variant: "separated" },
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Separated 1<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Separated 2<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Filled: Story = {
  args: { variant: "filled" },
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Filled 1<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: { type: "multiple" },
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content 1.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content 2.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Collapsible: Story = {
  args: { collapsible: true },
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Collapsible<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Can collapse all items.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Cannot open.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const KeyboardNavigation: Story = {
  render: () => (
    <Accordion collapsible defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First<AccordionIcon /></AccordionTrigger>
        <AccordionContent>First content.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Second content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstTrigger = canvas.getByRole("button", { name: /First/ })
    await expect(firstTrigger).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(canvas.getByRole("button", { name: /Second/ }))
  },
}

export const ExpandCollapse: Story = {
  render: () => (
    <Accordion collapsible defaultValue={[]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Click to expand<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Expanded content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: /Click to expand/ })
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
  },
}

export const Accessibility: Story = {
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Accessible Section<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content region.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: /Accessible Section/ })
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    const region = canvas.getByRole("region")
    await expect(region).toBeInTheDocument()
  },
}

export const SmallSize: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Small<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Small content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const LargeSize: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Accordion {...args} defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Large<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Large content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Hover: Story = {
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Hover test<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Focus test<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: { pseudo: { focusVisible: true } },
}

export const ActiveState: Story = {
  render: () => (
    <Accordion defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Active test<AccordionIcon /></AccordionTrigger>
        <AccordionContent>Content.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: { pseudo: { active: true } },
}
