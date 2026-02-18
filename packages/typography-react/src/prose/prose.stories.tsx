import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Prose } from "./prose.js"

const meta = {
  title: "Typography/Prose",
  tags: ["autodocs", "stable"],
  component: Prose,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["default", "muted"] },
    trimMargins: { control: "boolean" },
    as: { control: "select", options: ["div", "article", "section"] },
  },
  args: {},
} satisfies Meta<typeof Prose>

export default meta
type Story = StoryObj<typeof meta>

const sampleContent = (
  <>
    <h2>Article Title</h2>
    <p>
      This is a prose container that applies typographic styles to its child HTML elements
      including headings, paragraphs, lists, and more.
    </p>
    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ul>
    <p>Another paragraph with more content to demonstrate spacing.</p>
  </>
)

export const Playground: Story = {
  render: (args) => <Prose {...args}>{sampleContent}</Prose>,
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => <Prose {...args}>{sampleContent}</Prose>,
}

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => <Prose {...args}>{sampleContent}</Prose>,
}

export const MutedColor: Story = {
  args: { color: "muted" },
  render: (args) => <Prose {...args}>{sampleContent}</Prose>,
}

export const TrimmedMargins: Story = {
  args: { trimMargins: true },
  render: (args) => (
    <div style={{ border: "1px solid #e2e8f0", padding: 16 }}>
      <Prose {...args}>{sampleContent}</Prose>
    </div>
  ),
}

export const AsArticle: Story = {
  args: { as: "article" },
  render: (args) => <Prose {...args}>{sampleContent}</Prose>,
}

export const RenderTest: Story = {
  render: () => (
    <Prose>
      <p>Test content</p>
    </Prose>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Test content")).toBeInTheDocument()
  },
}

export const SemanticHTML: Story = {
  render: () => (
    <Prose as="article">
      <p>Article content</p>
    </Prose>
  ),
  play: async ({ canvasElement }) => {
    const article = canvasElement.querySelector("article")
    await expect(article).toBeTruthy()
  },
}
