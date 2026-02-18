import type { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { Tabs, TabList, Tab, TabPanel } from "./tabs.js"

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["line", "enclosed", "pill"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    fitted: { control: "boolean" },
  },
  args: {
    variant: "line",
    size: "md",
    orientation: "horizontal",
    fitted: false,
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab active aria-controls="panel-1" id="tab-1">Tab 1</Tab>
        <Tab aria-controls="panel-2" id="tab-2">Tab 2</Tab>
        <Tab aria-controls="panel-3" id="tab-3">Tab 3</Tab>
      </TabList>
      <TabPanel id="panel-1" aria-labelledby="tab-1">Content 1</TabPanel>
    </Tabs>
  ),
}

export const Line: Story = {
  args: { variant: "line" },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab active>Active</Tab>
        <Tab>Inactive</Tab>
      </TabList>
      <TabPanel>Line variant content</TabPanel>
    </Tabs>
  ),
}

export const Enclosed: Story = {
  args: { variant: "enclosed" },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab active>Active</Tab>
        <Tab>Inactive</Tab>
      </TabList>
      <TabPanel>Enclosed variant content</TabPanel>
    </Tabs>
  ),
}

export const Pill: Story = {
  args: { variant: "pill" },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab active>Active</Tab>
        <Tab>Inactive</Tab>
      </TabList>
      <TabPanel>Pill variant content</TabPanel>
    </Tabs>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab active>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanel>Small tabs content</TabPanel>
    </Tabs>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab active>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanel>Large tabs content</TabPanel>
    </Tabs>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-orientation="vertical">
        <Tab active>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Vertical content</TabPanel>
    </Tabs>
  ),
}

export const Fitted: Story = {
  args: { fitted: true },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab active>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Fitted content</TabPanel>
    </Tabs>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <Tabs>
      <TabList>
        <Tab active>Tab 1</Tab>
        <Tab disabled>Disabled</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Content</TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const disabledTab = canvas.getByRole("tab", { name: "Disabled" })
    await expect(disabledTab).toBeDisabled()
    await expect(disabledTab).toHaveAttribute("aria-disabled", "true")
    const activeTab = canvas.getByRole("tab", { name: "Tab 1" })
    await expect(activeTab).toHaveAttribute("aria-selected", "true")
  },
}
