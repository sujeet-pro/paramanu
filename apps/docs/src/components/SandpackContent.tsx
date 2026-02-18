import { Sandpack } from "@codesandbox/sandpack-react"
// @ts-expect-error -- Vite ?raw import resolves at build time
import paramanuCSS from "@paramanu/buttons-js/css?raw"
// @ts-expect-error -- Vite ?raw import, relative path needed for client build
import coreJS from "../../../../packages/buttons-js/dist/js/index.js?raw"
// @ts-expect-error -- Vite ?raw import, relative path needed for client build
import reactDistJS from "../../../../packages/buttons-react/dist/index.js?raw"

interface SandpackContentProps {
  reactCode: string
  htmlCode: string
  activeTab: "react" | "html"
}

function buildSandpackReactModule(core: string, react: string): string {
  const coreStripped = core
    .replace(/export\s*\{[\s\S]*?\};?/g, "")
    .replace(/\/\/# sourceMappingURL=.*$/gm, "")
    .replace(/^\/\/ src\/.*$/gm, "")
    .trim()

  const reactStripped = react
    .replace(/import\s*\{[^}]*\}\s*from\s*["']@paramanu\/buttons-js["'];?\n?/g, "")
    .replace(/\/\/# sourceMappingURL=.*$/gm, "")
    .replace(/^\/\/ src\/.*$/gm, "")
    .trim()

  return `${coreStripped}\n\n${reactStripped}\n`
}

const paramanuReactModule = buildSandpackReactModule(coreJS, reactDistJS)

function buildConsumerCode(code: string): string {
  return code.replace(
    /import\s*(\{[^}]+\})\s*from\s*["']@paramanu\/buttons-react["']/,
    'import $1 from "./paramanu-react"\nimport "./styles.css"',
  )
}

function wrapHtmlCode(code: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${paramanuCSS}</style>
  <style>
    body {
      padding: 24px;
      font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body>
${code}
</body>
</html>`
}

export default function SandpackContent({ reactCode, htmlCode, activeTab }: SandpackContentProps) {
  if (activeTab === "react") {
    return (
      <Sandpack
        key="react"
        template="react"
        files={{
          "/App.js": { code: buildConsumerCode(reactCode), active: true },
          "/paramanu-react.js": { code: paramanuReactModule, hidden: true },
          "/styles.css": { code: paramanuCSS, hidden: true },
        }}
        theme="dark"
        options={{
          showNavigator: false,
          showTabs: false,
          editorHeight: 350,
        }}
      />
    )
  }

  return (
    <Sandpack
      key="html"
      template="static"
      files={{
        "/index.html": { code: wrapHtmlCode(htmlCode), active: true },
      }}
      theme="dark"
      options={{
        showNavigator: false,
        showTabs: false,
        editorHeight: 350,
      }}
    />
  )
}
