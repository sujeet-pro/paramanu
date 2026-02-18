import type { Meta, StoryObj } from "@storybook/react"
import { LocaleProvider, useLocale } from "./locale-provider.js"

function LocaleDisplay() {
  const { locale, setLocale } = useLocale()
  return (
    <div style={{ padding: "16px" }}>
      <p>Current locale: {locale}</p>
      <button type="button" onClick={() => setLocale("en-US")}>
        English
      </button>
      <button type="button" onClick={() => setLocale("de-DE")}>
        German
      </button>
      <button type="button" onClick={() => setLocale("ja")}>
        Japanese
      </button>
    </div>
  )
}

const meta = {
  title: "Utilities/LocaleProvider",
  component: LocaleProvider,
  tags: ["autodocs"],
  argTypes: {
    defaultLocale: { control: "text" },
  },
  args: {
    defaultLocale: "en",
    children: <LocaleDisplay />,
  },
} satisfies Meta<typeof LocaleProvider>

export default meta
type Story = StoryObj<typeof LocaleProvider>

export const Playground: Story = {}

export const German: Story = {
  args: { defaultLocale: "de-DE" },
}
