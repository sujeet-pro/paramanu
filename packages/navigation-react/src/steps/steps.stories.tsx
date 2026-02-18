import type { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { Steps, Step, StepIndicator, StepConnector, StepContent } from "./steps.js"

const meta = {
  title: "Navigation/Steps",
  component: Steps,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    size: "md",
    orientation: "horizontal",
  },
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Steps {...args}>
      <Step status="complete">
        <StepIndicator status="complete">1</StepIndicator>
        <StepContent>Account</StepContent>
      </Step>
      <StepConnector status="complete" />
      <Step status="active">
        <StepIndicator status="active">2</StepIndicator>
        <StepContent>Details</StepContent>
      </Step>
      <StepConnector status="incomplete" />
      <Step status="incomplete">
        <StepIndicator status="incomplete">3</StepIndicator>
        <StepContent>Confirm</StepContent>
      </Step>
    </Steps>
  ),
}

export const AllComplete: Story = {
  render: () => (
    <Steps>
      <Step status="complete">
        <StepIndicator status="complete">1</StepIndicator>
        <StepContent>Step 1</StepContent>
      </Step>
      <StepConnector status="complete" />
      <Step status="complete">
        <StepIndicator status="complete">2</StepIndicator>
        <StepContent>Step 2</StepContent>
      </Step>
      <StepConnector status="complete" />
      <Step status="complete">
        <StepIndicator status="complete">3</StepIndicator>
        <StepContent>Step 3</StepContent>
      </Step>
    </Steps>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Steps {...args}>
      <Step status="complete">
        <StepIndicator status="complete">1</StepIndicator>
        <StepContent>First</StepContent>
      </Step>
      <StepConnector status="complete" />
      <Step status="active">
        <StepIndicator status="active">2</StepIndicator>
        <StepContent>Second</StepContent>
      </Step>
      <StepConnector status="incomplete" />
      <Step status="incomplete">
        <StepIndicator status="incomplete">3</StepIndicator>
        <StepContent>Third</StepContent>
      </Step>
    </Steps>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Steps {...args}>
      <Step status="active">
        <StepIndicator status="active">1</StepIndicator>
        <StepContent>Step</StepContent>
      </Step>
    </Steps>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Steps {...args}>
      <Step status="active">
        <StepIndicator status="active">1</StepIndicator>
        <StepContent>Step</StepContent>
      </Step>
    </Steps>
  ),
}

export const ActiveStepAccessibility: Story = {
  render: () => (
    <Steps>
      <Step status="complete">
        <StepIndicator status="complete">1</StepIndicator>
        <StepContent>Done</StepContent>
      </Step>
      <StepConnector status="complete" />
      <Step status="active">
        <StepIndicator status="active">2</StepIndicator>
        <StepContent>Current</StepContent>
      </Step>
    </Steps>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("list", { name: "Progress" })).toBeInTheDocument()
  },
}
