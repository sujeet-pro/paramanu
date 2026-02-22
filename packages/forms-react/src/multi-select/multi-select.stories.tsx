import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { MultiSel } from "./multi-select.js"

const meta = {
  title: "Forms/Multi Select",
  tags: ["autodocs", "beta"],
  component: MultiSel,
  argTypes: {
    variant: { control: "select", options: ["outline", "filled", "unstyled"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    open: { control: "boolean" },
    fullWidth: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Select items...",
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof MultiSel>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <div role="option">React</div>
        <div role="option">Vue</div>
        <div role="option">Angular</div>
      </>
    ),
  },
}

export const Open: Story = {
  args: {
    open: true,
    children: (
      <>
        <div role="option">React</div>
        <div role="option">Vue</div>
      </>
    ),
  },
}

export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Filled: Story = { args: { variant: "filled" } }
export const Unstyled: Story = { args: { variant: "unstyled" } }
export const FullWidth: Story = { args: { fullWidth: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const ExtraSmall: Story = { args: { size: "xs" } }

export const SelectInteraction: Story = {
  args: {
    children: (
      <>
        <div role="option">React</div>
        <div role="option">Vue</div>
        <div role="option">Angular</div>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const combobox = canvas.getByRole("combobox")
    await userEvent.click(combobox)
    await expect(combobox).toBeTruthy()
  },
}

export const KeyboardNavigation: Story = {
  args: {
    children: (
      <>
        <div role="option">React</div>
        <div role="option">Vue</div>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-multi-sel")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: {
    children: (
      <>
        <div role="option">React</div>
        <div role="option">Vue</div>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const combobox = canvas.getByRole("combobox")
    await expect(combobox).toHaveAttribute("aria-haspopup", "listbox")
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
