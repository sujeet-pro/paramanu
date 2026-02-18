import type { Meta, StoryObj } from "@storybook/react"
import { PinInput } from "./pin-input.js"

const meta = {
  title: "Forms/Pin Input",
  tags: ["autodocs"],
  component: PinInput,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
  args: {},
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
