#!/usr/bin/env node

/**
 * Migration script: Splits existing single-file MDX component docs into
 * per-page-type files for both -js and -react framework paths.
 *
 * Source: apps/docs/src/content/docs/components/<group>/<component>.mdx
 * Output: apps/docs/src/content/docs/<group>-{js,react}/components/<component>/{usage,guidelines,api,research}.mdx
 *
 * Run: node apps/docs/scripts/migrate-docs.mjs
 */

import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(
  new URL(".", import.meta.url).pathname,
  "..",
  "src",
  "content",
  "docs",
)
const COMPONENTS_DIR = path.join(ROOT, "components")

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { frontmatter: {}, bodyStart: 0 }

  const fm = {}
  const lines = match[1].split("\n")
  let currentKey = null
  let indentedBlock = []

  function flushIndented() {
    if (currentKey && indentedBlock.length) {
      const obj = {}
      for (const line of indentedBlock) {
        const kv = line.trim().match(/^(\w+):\s*(.*)$/)
        if (kv) obj[kv[1]] = kv[2]
      }
      fm[currentKey] = obj
      indentedBlock = []
    }
  }

  for (const line of lines) {
    if (/^\s+\w+:/.test(line)) {
      indentedBlock.push(line)
    } else {
      flushIndented()
      const kv = line.match(/^(\w+):\s*(.*)$/)
      if (kv) {
        const val = kv[2]
        if (val === "") {
          // next lines are indented sub-object
          currentKey = kv[1]
        } else {
          fm[kv[1]] = val
          currentKey = null
        }
      }
    }
  }
  flushIndented()

  return { frontmatter: fm, bodyStart: match[0].length }
}

function toTitleCase(str) {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function buildFrontmatter(title, description, opts = {}) {
  let fm = "---\n"
  fm += `title: "${title}"\n`
  fm += `description: "${description.replace(/"/g, '\\"')}"\n`
  if (opts.badge) {
    fm += `badge:\n`
    fm += `  text: ${opts.badge.text}\n`
    fm += `  variant: ${opts.badge.variant}\n`
  }
  if (opts.sidebarLabel) {
    fm += `sidebar:\n`
    fm += `  label: "${opts.sidebarLabel}"\n`
  } else {
    fm += `sidebar:\n`
    fm += `  hidden: true\n`
  }
  fm += "---\n"
  return fm
}

function extractBetweenTabItems(content, label) {
  // Match <TabItem label="Label"> ... </TabItem> at the top-level of the Tabs
  // We need to handle nested TabItems (Pattern B has inner Tabs/TabItems)
  const openTag = `<TabItem label="${label}">`
  const idx = content.indexOf(openTag)
  if (idx === -1) return ""

  const start = idx + openTag.length
  let depth = 1
  let i = start
  while (i < content.length && depth > 0) {
    if (content.startsWith("<TabItem", i)) {
      depth++
      i += 8
    } else if (content.startsWith("</TabItem>", i)) {
      depth--
      if (depth === 0) break
      i += 10
    } else {
      i++
    }
  }

  return content.slice(start, i).trim()
}

function splitApiContent(apiContent) {
  // Split into sections: ## React Props, ## CSS Classes, ## CSS Custom Properties
  const sections = {}
  const sectionRegex = /^(## .+)$/gm
  let matches = []
  let m
  while ((m = sectionRegex.exec(apiContent)) !== null) {
    matches.push({ heading: m[1], index: m.index })
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index
    const end = i + 1 < matches.length ? matches[i + 1].index : apiContent.length
    const sectionContent = apiContent.slice(start, end).trim()
    const heading = matches[i].heading.replace("## ", "").trim()
    sections[heading] = sectionContent
  }

  return sections
}

function extractPatternBSections(body) {
  // Split body by ## headings: Overview, Usage, Guidelines, API
  const sections = {}
  const headingRegex = /^## (Overview|Usage|Guidelines|API)\b/gm
  const matches = []
  let m
  while ((m = headingRegex.exec(body)) !== null) {
    matches.push({ heading: m[1], index: m.index, fullMatch: m[0] })
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].fullMatch.length
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length
    sections[matches[i].heading] = body.slice(start, end).trim()
  }

  return sections
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const groups = fs
  .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

let totalFiles = 0
let totalGenerated = 0

for (const group of groups) {
  const groupDir = path.join(COMPONENTS_DIR, group)
  const files = fs
    .readdirSync(groupDir)
    .filter((f) => f.endsWith(".mdx"))

  for (const file of files) {
    const componentSlug = file.replace(".mdx", "")
    const filePath = path.join(groupDir, file)
    const raw = fs.readFileSync(filePath, "utf-8")
    totalFiles++

    const { frontmatter, bodyStart } = parseFrontmatter(raw)
    const body = raw.slice(bodyStart).trim()

    const title = frontmatter.title || toTitleCase(componentSlug)
    const description =
      frontmatter.description || `${title} component documentation.`
    const badge = frontmatter.badge || null

    const isPatternA = body.includes('syncKey="component-tab"')

    // Extract the Aside warning if present
    const asideMatch = body.match(
      /<Aside type="caution"[\s\S]*?<\/Aside>/,
    )
    const asideBlock = asideMatch ? asideMatch[0] : ""

    // Extract intro text (between imports/aside and Tabs)
    let introText = ""

    if (isPatternA) {
      // Pattern A: intro is between the Aside (or imports) and <Tabs syncKey=
      const tabsIdx = body.indexOf('<Tabs syncKey="component-tab">')
      if (tabsIdx !== -1) {
        let introStart = 0
        // Skip past import lines and Aside block
        const importEnd = body.lastIndexOf("import ", tabsIdx)
        if (importEnd !== -1) {
          const importLineEnd = body.indexOf("\n", importEnd)
          introStart = importLineEnd + 1
        }
        // Skip past Aside block
        if (asideMatch) {
          const asideEnd =
            body.indexOf("</Aside>", introStart) + "</Aside>".length
          introStart = asideEnd
        }
        introText = body.slice(introStart, tabsIdx).trim()
      }
    }

    let usageContent = ""
    let guidelinesContent = ""
    let jsApiContent = ""
    let reactApiContent = ""
    let usageImportsPatternA = ""
    let usageImportsPatternB = ""

    if (isPatternA) {
      // Pattern A: extract from TabItems
      const tabsStart = body.indexOf('<Tabs syncKey="component-tab">')
      const tabsEnd = body.lastIndexOf("</Tabs>")
      const tabsBody = body.slice(tabsStart, tabsEnd + "</Tabs>".length)

      usageContent = extractBetweenTabItems(tabsBody, "Usage")
      guidelinesContent = extractBetweenTabItems(tabsBody, "Guidelines")
      const fullApi = extractBetweenTabItems(tabsBody, "API")

      // Split API
      const apiSections = splitApiContent(fullApi)
      const cssClassesSection = apiSections["CSS Classes"] || ""
      const cssPropsSection = apiSections["CSS Custom Properties"] || ""
      const reactPropsSection = apiSections["React Props"] || ""

      const jsParts = [cssClassesSection, cssPropsSection]
        .filter(Boolean)
        .join("\n\n")
      jsApiContent = jsParts || fullApi
      reactApiContent = fullApi

      usageImportsPatternA = [
        'import ComponentPreview from "../../../../../components/ComponentPreview.astro"',
        'import { Aside } from "@astrojs/starlight/components"',
      ].join("\n")
    } else {
      // Pattern B: split by headings
      const sections = extractPatternBSections(body)
      const overview = sections["Overview"] || ""
      usageContent = sections["Usage"] || ""
      guidelinesContent = sections["Guidelines"] || ""
      const apiRaw = sections["API"] || ""

      // For pattern B, prepend overview to usage
      if (overview) {
        usageContent = `## Overview\n\n${overview}\n\n## Usage\n\n${usageContent}`
      } else {
        usageContent = `## Usage\n\n${usageContent}`
      }

      // Pattern B API is the same for both frameworks
      jsApiContent = apiRaw ? `## API\n\n${apiRaw}` : ""
      reactApiContent = jsApiContent

      usageImportsPatternB =
        'import { Aside, Tabs, TabItem } from "@astrojs/starlight/components"'
    }

    // Generate files for both frameworks
    for (const framework of ["js", "react"]) {
      const outDir = path.join(
        ROOT,
        `${group}-${framework}`,
        "components",
        componentSlug,
      )
      fs.mkdirSync(outDir, { recursive: true })

      // --- usage.mdx ---
      {
        const fm = buildFrontmatter(title, description, {
          badge,
          sidebarLabel: title,
        })
        let content = fm + "\n"

        if (isPatternA) {
          content += usageImportsPatternA + "\n\n"
          if (asideBlock) {
            content += asideBlock + "\n\n"
          }
          if (introText) {
            content += introText + "\n\n"
          }
          content += usageContent + "\n"
        } else {
          content += usageImportsPatternB + "\n\n"
          if (asideBlock) {
            content += asideBlock + "\n\n"
          }
          content += usageContent + "\n"
        }

        fs.writeFileSync(path.join(outDir, "usage.mdx"), content)
        totalGenerated++
      }

      // --- guidelines.mdx ---
      {
        const fm = buildFrontmatter(title, description, { badge })
        let content = fm + "\n"
        content += guidelinesContent + "\n"
        fs.writeFileSync(path.join(outDir, "guidelines.mdx"), content)
        totalGenerated++
      }

      // --- api.mdx ---
      {
        const fm = buildFrontmatter(title, description, { badge })
        let content = fm + "\n"
        content +=
          (framework === "react" ? reactApiContent : jsApiContent) + "\n"
        fs.writeFileSync(path.join(outDir, "api.mdx"), content)
        totalGenerated++
      }

      // --- research.mdx ---
      {
        const fm = buildFrontmatter(title, description, { badge })
        let content = fm + "\n"
        content += "Research content coming soon.\n"
        fs.writeFileSync(path.join(outDir, "research.mdx"), content)
        totalGenerated++
      }
    }
  }
}

console.log(`Processed ${totalFiles} source files.`)
console.log(`Generated ${totalGenerated} output files.`)
