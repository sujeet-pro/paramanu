import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"
import react from "@astrojs/react"

export default defineConfig({
  integrations: [
    starlight({
      title: "Paramanu",
      description: "A modern, accessible design system",
      social: {
        github: "https://github.com/sujeet-pro/paramanu",
      },
      customCss: ["./src/styles/paramanu-preview.css"],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Usage: CDN", slug: "getting-started/usage-cdn" },
            { label: "Usage: Templated", slug: "getting-started/usage-templated" },
            { label: "Usage: React", slug: "getting-started/usage-react" },
          ],
        },
        {
          label: "Components",
          items: [{ label: "Button", slug: "components/button" }],
        },
        {
          label: "Tokens",
          items: [
            { label: "Colors", slug: "tokens/colors" },
            { label: "Spacing", slug: "tokens/spacing" },
            { label: "Typography", slug: "tokens/typography" },
          ],
        },
        {
          label: "Storybooks",
          items: [
            {
              label: "React Storybook",
              link: "/storybook/react/",
              attrs: { target: "_blank" },
            },
            {
              label: "Vanilla Storybook",
              link: "/storybook/vanilla/",
              attrs: { target: "_blank" },
            },
          ],
        },
      ],
    }),
    react(),
  ],
})
