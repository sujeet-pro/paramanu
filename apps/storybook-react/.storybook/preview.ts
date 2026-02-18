import "@paramanu/primitives-js/css"
import "@paramanu/typography-js/css"
import "@paramanu/buttons-js/css"
import "@paramanu/forms-js/css"
import "@paramanu/navigation-js/css"
import "@paramanu/data-display-js/css"
import "@paramanu/feedback-js/css"
import "@paramanu/overlays-js/css"
import "@paramanu/disclosure-js/css"
import "@paramanu/utilities-js/css"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
