import type { Meta, StoryObj } from "@storybook/react"
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
  tags: ["autodocs"],
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
