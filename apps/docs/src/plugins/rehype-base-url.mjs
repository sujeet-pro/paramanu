/**
 * Rehype plugin that prepends the Astro `base` path to internal absolute links
 * in Markdown/MDX content. This keeps content files free of base-path knowledge.
 *
 * Targets:
 * - `<a href>` elements where href starts with `/` (but not `//`)
 * - MDX JSX components (e.g. `<LinkCard href="/">`) with `href` or `link` attributes
 */
export function rehypeBaseUrl({ base = "/" } = {}) {
  const prefix = base.replace(/\/$/, "")
  if (!prefix) return () => {}

  const LINK_ATTRS = new Set(["href", "link"])

  function isInternalAbsolute(value) {
    return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
  }

  function walk(node) {
    // Standard HTML <a> elements from Markdown links
    if (node.type === "element" && node.tagName === "a") {
      const href = node.properties?.href
      if (isInternalAbsolute(href)) {
        node.properties.href = prefix + href
      }
    }

    // MDX JSX components (e.g. <LinkCard href="/path/">, <LinkButton link="/path/">)
    if (
      (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
      node.attributes
    ) {
      for (const attr of node.attributes) {
        if (
          attr.type === "mdxJsxAttribute" &&
          LINK_ATTRS.has(attr.name) &&
          isInternalAbsolute(attr.value)
        ) {
          attr.value = prefix + attr.value
        }
      }
    }

    if (node.children) {
      for (const child of node.children) {
        walk(child)
      }
    }
  }

  return (tree) => walk(tree)
}
