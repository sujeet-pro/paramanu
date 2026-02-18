import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { AspectRatio } from "./aspect-ratio.js"

const meta = {
  title: "Primitives/Aspect Ratio",
  tags: ["autodocs", "stable"],
  component: AspectRatio,
  argTypes: {
    ratio: { control: "select", options: ["1/1", "2/3", "3/2", "4/3", "3/4", "16/9", "9/16", "21/9"] },
  },
  args: { ratio: "16/9" },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

/** The default playground story. */
export const Playground: Story = {
  render: (args) => (
    <div style={{ width: "400px" }}>
      <AspectRatio {...args}>
        <div style={{ background: "#e2e8f0", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {args.ratio}
        </div>
      </AspectRatio>
    </div>
  ),
}

/** Square 1:1 ratio. */
export const Square: Story = {
  args: { ratio: "1/1" },
  render: (args) => (
    <div style={{ width: "200px" }}>
      <AspectRatio {...args}>
        <div style={{ background: "#e2e8f0", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
}

/** Widescreen 16:9 ratio. */
export const Widescreen: Story = {
  args: { ratio: "16/9" },
  render: (args) => (
    <div style={{ width: "400px" }}>
      <AspectRatio {...args}>
        <div style={{ background: "#e2e8f0", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
}

/** Portrait 3:4 ratio. */
export const Portrait: Story = {
  args: { ratio: "3/4" },
  render: (args) => (
    <div style={{ width: "200px" }}>
      <AspectRatio {...args}>
        <div style={{ background: "#e2e8f0", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          3:4
        </div>
      </AspectRatio>
    </div>
  ),
}

/** 2:3 ratio. */
export const Ratio2By3: Story = {
  args: { ratio: "2/3" },
  render: Playground.render,
}

/** 3:2 ratio. */
export const Ratio3By2: Story = {
  args: { ratio: "3/2" },
  render: Playground.render,
}

/** 4:3 ratio. */
export const Ratio4By3: Story = {
  args: { ratio: "4/3" },
  render: Playground.render,
}

/** 9:16 portrait ratio. */
export const Portrait9By16: Story = {
  args: { ratio: "9/16" },
  render: Playground.render,
}

/** Ultrawide 21:9 ratio. */
export const Ultrawide: Story = {
  args: { ratio: "21/9" },
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
    const el = canvasElement.querySelector(".pm-aspect-ratio")
    await expect(el).toBeTruthy()
  },
}
