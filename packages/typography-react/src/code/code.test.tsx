import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Code } from "./code.js"

afterEach(cleanup)

describe("Code", () => {
  it("renders inline code with text content", () => {
    render(<Code>const x = 1</Code>)
    expect(screen.getByText("const x = 1")).toBeInTheDocument()
  })

  it("renders a <code> element for inline code", () => {
    render(<Code>inline</Code>)
    const el = screen.getByText("inline")
    expect(el.tagName).toBe("CODE")
  })

  it("applies default inline classes", () => {
    render(<Code>default</Code>)
    const el = screen.getByText("default")
    expect(el.className).toContain("pm-code")
  })

  it("renders a <pre> wrapping <code> for block code", () => {
    const { container } = render(<Code block>block code</Code>)
    const pre = container.querySelector("pre")
    expect(pre).not.toBeNull()
    expect(pre!.querySelector("code")).not.toBeNull()
    expect(screen.getByText("block code")).toBeInTheDocument()
  })

  it("applies block classes to <pre>", () => {
    const { container } = render(<Code block>block</Code>)
    const pre = container.querySelector("pre")
    expect(pre!.className).toContain("pm-code-block")
  })

  it("applies size class for inline", () => {
    render(<Code size="sm">small</Code>)
    const el = screen.getByText("small")
    expect(el.className).toContain("pm-code--size-sm")
  })

  it("applies size class for block", () => {
    const { container } = render(<Code block size="lg">large block</Code>)
    const pre = container.querySelector("pre")
    expect(pre!.className).toContain("pm-code-block--size-lg")
  })

  it("forwards ref for inline code", () => {
    let codeRef: HTMLElement | null = null
    render(<Code ref={(el) => (codeRef = el)}>ref inline</Code>)
    expect(codeRef).toBeInstanceOf(HTMLElement)
    expect(codeRef!.tagName).toBe("CODE")
  })

  it("forwards ref for block code to <pre>", () => {
    let codeRef: HTMLElement | null = null
    render(
      <Code block ref={(el) => (codeRef = el)}>
        ref block
      </Code>,
    )
    expect(codeRef).toBeInstanceOf(HTMLPreElement)
  })

  it("merges custom className", () => {
    render(<Code className="custom-class">custom</Code>)
    const el = screen.getByText("custom")
    expect(el.className).toContain("pm-code")
    expect(el.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(<Code data-testid="my-code">test</Code>)
    expect(screen.getByTestId("my-code")).toBeInTheDocument()
  })
})
