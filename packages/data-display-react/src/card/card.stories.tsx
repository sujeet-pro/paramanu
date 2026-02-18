import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardBody, CardFooter, CardMedia } from "./card.js"

const meta = {
  title: "Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "outline", "filled", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    interactive: { control: "boolean" },
    fullWidth: { control: "boolean" },
    horizontal: { control: "boolean" },
  },
  args: {
    variant: "elevated",
    size: "md",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: (args) => (
    <Card {...args}>
      <CardHeader>Card Header</CardHeader>
      <CardBody>This is the card body content.</CardBody>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  ),
}

export const Elevated: Story = {
  args: { variant: "elevated" },
  render: (args) => (
    <Card {...args}>
      <CardBody>Elevated card with shadow.</CardBody>
    </Card>
  ),
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Card {...args}>
      <CardBody>Outline card with border.</CardBody>
    </Card>
  ),
}

export const Filled: Story = {
  args: { variant: "filled" },
  render: (args) => (
    <Card {...args}>
      <CardBody>Filled card with background.</CardBody>
    </Card>
  ),
}

export const Ghost: Story = {
  args: { variant: "ghost" },
  render: (args) => (
    <Card {...args}>
      <CardBody>Ghost card with no border or shadow.</CardBody>
    </Card>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args}>
      <CardBody>Small card.</CardBody>
    </Card>
  ),
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Card {...args}>
      <CardBody>Large card.</CardBody>
    </Card>
  ),
}

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args}>
      <CardBody>Hover or focus this card.</CardBody>
    </Card>
  ),
}

export const Horizontal: Story = {
  args: { horizontal: true },
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <div style={{ width: 120, height: 120, background: "#e0e0e0" }} />
      </CardMedia>
      <CardBody>Horizontal layout card.</CardBody>
    </Card>
  ),
}

export const WithMedia: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <CardMedia>
        <div style={{ width: "100%", height: 160, background: "#e0e0e0" }} />
      </CardMedia>
      <CardHeader>Card with Media</CardHeader>
      <CardBody>Card body content below the media area.</CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <Card {...args}>
      <CardBody>Full width card stretches to fill its parent.</CardBody>
    </Card>
  ),
}
