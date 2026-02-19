import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { PinInput } from "./pin-input.js"

const meta = {
  title: "Forms/Pin Input",
  tags: ["autodocs", "beta"],
  component: PinInput,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: Array.from({ length: 4 }, (_, i) => {
      const props = {
        key: i,
        className: "pm-input pm-input--outline pm-input--md",
        maxLength: 1,
        inputMode: "numeric" as const,
        "aria-label": `Pin digit ${i + 1}`,
        style: { width: "3rem", textAlign: "center" as const },
      }
      return <input {...props} />
    }),
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--sm"
        maxLength={1}
        inputMode="numeric"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "2.5rem", textAlign: "center" }}
      />
    )),
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--lg"
        maxLength={1}
        inputMode="numeric"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "3.5rem", textAlign: "center" }}
      />
    )),
  },
}

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--xs"
        maxLength={1}
        inputMode="numeric"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "2rem", textAlign: "center" }}
      />
    )),
  },
}

export const SixDigits: Story = {
  args: {
    children: Array.from({ length: 6 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--md"
        maxLength={1}
        inputMode="numeric"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "3rem", textAlign: "center" }}
      />
    )),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--md pm-input--disabled"
        maxLength={1}
        inputMode="numeric"
        disabled
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "3rem", textAlign: "center" }}
      />
    )),
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--md pm-input--invalid"
        maxLength={1}
        inputMode="numeric"
        aria-invalid="true"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "3rem", textAlign: "center" }}
      />
    )),
  },
}

export const TypeDigits: Story = {
  args: {
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--md"
        maxLength={1}
        inputMode="numeric"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "3rem", textAlign: "center" }}
      />
    )),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputs = canvas.getAllByRole("textbox")
    await userEvent.type(inputs[0], "1")
    await expect(inputs[0]).toHaveValue("1")
  },
}

export const KeyboardNavigation: Story = {
  args: {
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--md"
        maxLength={1}
        inputMode="numeric"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "3rem", textAlign: "center" }}
      />
    )),
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector(".pm-pin-input")
    await expect(el).toBeTruthy()
    await userEvent.tab()
  },
}

export const Accessibility: Story = {
  args: {
    children: Array.from({ length: 4 }, (_, i) => (
      <input
        key={i}
        className="pm-input pm-input--outline pm-input--md"
        maxLength={1}
        inputMode="numeric"
        aria-label={`Pin digit ${i + 1}`}
        style={{ width: "3rem", textAlign: "center" }}
      />
    )),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("group")
    await expect(group).toBeTruthy()
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
