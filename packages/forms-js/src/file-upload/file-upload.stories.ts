import type { Meta, StoryObj } from "@storybook/html"
import { fileUploadClasses } from "./file-upload.classes.js"
import type { FileUploadClassesOptions } from "./file-upload.types.js"

type FileUploadArgs = FileUploadClassesOptions

function createFileUpload(args: FileUploadArgs): HTMLElement {
  const wrapper = document.createElement("div")
  wrapper.className = fileUploadClasses(args)
  if (args.disabled) wrapper.setAttribute("aria-disabled", "true")
  const input = document.createElement("input")
  input.type = "file"
  input.className = "pm-file-upload__input"
  if (args.disabled) input.disabled = true
  wrapper.appendChild(input)
  return wrapper
}

const meta = {
  title: "Forms/File Upload",
  tags: ["autodocs"],
  render: (args) => createFileUpload(args as FileUploadArgs),
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: { size: "md" },
} satisfies Meta<FileUploadArgs>

export default meta
type Story = StoryObj<FileUploadArgs>

export const Playground: Story = {}
export const Disabled: Story = { args: { disabled: true } }
