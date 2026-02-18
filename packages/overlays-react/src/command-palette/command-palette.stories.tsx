import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import {
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteItem,
  CommandPaletteGroup,
  CommandPaletteEmpty,
} from "./command-palette.js"

const meta = {
  title: "Overlays/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs", "stable"],
  argTypes: {
    open: { control: "boolean" },
  },
  args: {
    open: true,
    children: (
      <>
        <CommandPaletteInput placeholder="Type a command..." />
        <CommandPaletteList>
          <CommandPaletteGroup>
            <CommandPaletteItem value="new-file">New File</CommandPaletteItem>
            <CommandPaletteItem value="open-file">Open File</CommandPaletteItem>
            <CommandPaletteItem value="save" active>
              Save
            </CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </>
    ),
  },
} satisfies Meta<typeof CommandPalette>

export default meta
type Story = StoryObj<typeof CommandPalette>

export const Playground: Story = {}

export const Empty: Story = {
  args: {
    children: (
      <>
        <CommandPaletteInput placeholder="Type a command..." />
        <CommandPaletteList>
          <CommandPaletteEmpty>No results found.</CommandPaletteEmpty>
        </CommandPaletteList>
      </>
    ),
  },
}

export const SelectItem: Story = {
  render: () => {
    const onSelect = fn()
    return (
      <CommandPalette open>
        <CommandPaletteInput placeholder="Type a command..." />
        <CommandPaletteList>
          <CommandPaletteGroup>
            <CommandPaletteItem value="new" onClick={onSelect}>
              New File
            </CommandPaletteItem>
            <CommandPaletteItem value="open">Open File</CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByText("New File")
    await userEvent.click(item)
  },
}

export const SearchInput: Story = {
  render: () => (
    <CommandPalette open>
      <CommandPaletteInput placeholder="Search commands..." />
      <CommandPaletteList>
        <CommandPaletteGroup>
          <CommandPaletteItem value="save">Save</CommandPaletteItem>
        </CommandPaletteGroup>
      </CommandPaletteList>
    </CommandPalette>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Search commands...")
    await userEvent.type(input, "save")
    await expect(input).toHaveValue("save")
  },
}

export const Accessibility: Story = {
  render: () => (
    <CommandPalette open>
      <CommandPaletteInput placeholder="Type a command..." />
      <CommandPaletteList>
        <CommandPaletteGroup>
          <CommandPaletteItem value="test">Test</CommandPaletteItem>
        </CommandPaletteGroup>
      </CommandPaletteList>
    </CommandPalette>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("combobox")).toBeInTheDocument()
    await expect(canvas.getByRole("listbox")).toBeInTheDocument()
  },
}

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
