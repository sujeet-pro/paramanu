import type { Meta, StoryObj } from "@storybook/html-vite"
import { uploadClasses } from "./file-upload.classes.js"
import type { UploadClassesOptions } from "./file-upload.types.js"

type UploadArgs = UploadClassesOptions

function createUpload(args: UploadArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = uploadClasses(args)
  if (args.disabled) wrapper.setAttribute("aria-disabled", "true")
  const input = document.createElement("input")
  input.type = "file"
  input.className = "pm-upload__input"
  if (args.disabled) input.disabled = true
  wrapper.appendChild(input)
  return wrapper
}

const meta = {
  title: "Forms/File Upload",
  tags: ["autodocs", "beta"],
  render: (args) => createUpload(args as UploadArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<UploadArgs>

export default meta
type Story = StoryObj<UploadArgs>

export const Playground: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const Active: Story = {
  parameters: { pseudo: { active: true } },
}
