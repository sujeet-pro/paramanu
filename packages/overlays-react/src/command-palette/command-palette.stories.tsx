import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import {
  CmdPalette,
  CmdPaletteInput,
  CmdPaletteList,
  CmdPaletteItem,
  CmdPaletteGroup,
  CmdPaletteEmpty,
} from "./command-palette.js"

const meta = {
  title: "Overlays/CmdPalette",
  component: CmdPalette,
  tags: ["autodocs", "beta"],
  argTypes: {
    open: { control: "boolean" },
  },
  args: {
    open: true,
    children: (
      <>
        <CmdPaletteInput placeholder="Type a command..." />
        <CmdPaletteList>
          <CmdPaletteGroup>
            <CmdPaletteItem value="new-file">New File</CmdPaletteItem>
            <CmdPaletteItem value="open-file">Open File</CmdPaletteItem>
            <CmdPaletteItem value="save" active>
              Save
            </CmdPaletteItem>
          </CmdPaletteGroup>
        </CmdPaletteList>
      </>
    ),
  },
} satisfies Meta<typeof CmdPalette>

export default meta
type Story = StoryObj<typeof CmdPalette>

export const Playground: Story = {}

export const Empty: Story = {
  args: {
    children: (
      <>
        <CmdPaletteInput placeholder="Type a command..." />
        <CmdPaletteList>
          <CmdPaletteEmpty>No results found.</CmdPaletteEmpty>
        </CmdPaletteList>
      </>
    ),
  },
}

export const SelectItem: Story = {
  render: () => {
    const onSelect = fn()
    return (
      <CmdPalette open>
        <CmdPaletteInput placeholder="Type a command..." />
        <CmdPaletteList>
          <CmdPaletteGroup>
            <CmdPaletteItem value="new" onClick={onSelect}>
              New File
            </CmdPaletteItem>
            <CmdPaletteItem value="open">Open File</CmdPaletteItem>
          </CmdPaletteGroup>
        </CmdPaletteList>
      </CmdPalette>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByText("New File")
    await userEvent.click(item)
  },
}

export const Search: Story = {
  render: () => (
    <CmdPalette open>
      <CmdPaletteInput placeholder="Search commands..." />
      <CmdPaletteList>
        <CmdPaletteGroup>
          <CmdPaletteItem value="save">Save</CmdPaletteItem>
        </CmdPaletteGroup>
      </CmdPaletteList>
    </CmdPalette>
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
    <CmdPalette open>
      <CmdPaletteInput placeholder="Type a command..." />
      <CmdPaletteList>
        <CmdPaletteGroup>
          <CmdPaletteItem value="test">Test</CmdPaletteItem>
        </CmdPaletteGroup>
      </CmdPaletteList>
    </CmdPalette>
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
