import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible.js"

afterEach(cleanup)

describe("Collapsible", () => {
  it("renders with trigger and content", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content here</CollapsibleContent>
      </Collapsible>,
    )
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument()
    expect(screen.getByRole("region")).toBeInTheDocument()
  })

  it("is closed by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content here</CollapsibleContent>
      </Collapsible>,
    )
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
  })

  it("opens when defaultOpen is true", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content here</CollapsibleContent>
      </Collapsible>,
    )
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("toggles open/closed on trigger click (uncontrolled)", async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content here</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("supports controlled mode", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()

    const { rerender } = render(
      <Collapsible open={false} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    await user.click(trigger)
    expect(onOpenChange).toHaveBeenCalledWith(true)

    rerender(
      <Collapsible open={true} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("does not toggle when disabled", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Collapsible disabled onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button")
    expect(trigger).toBeDisabled()
    await user.click(trigger)
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it("trigger has aria-controls pointing to content id", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button")
    const content = screen.getByRole("region")
    expect(trigger.getAttribute("aria-controls")).toBe(content.id)
  })

  it("content has aria-labelledby pointing to trigger id", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button")
    const content = screen.getByRole("region")
    expect(content.getAttribute("aria-labelledby")).toBe(trigger.id)
  })

  it("forwards ref on root", () => {
    let divRef: HTMLDivElement | null = null
    render(
      <Collapsible ref={(el) => (divRef = el)}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref on trigger", () => {
    let btnRef: HTMLButtonElement | null = null
    render(
      <Collapsible>
        <CollapsibleTrigger ref={(el) => (btnRef = el)}>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )
    expect(btnRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("forwards ref on content", () => {
    let divRef: HTMLDivElement | null = null
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent ref={(el) => (divRef = el)}>Content</CollapsibleContent>
      </Collapsible>,
    )
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className on root", () => {
    render(
      <Collapsible className="custom-root">
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )

    const root = screen.getByRole("button").parentElement!
    expect(root.className).toContain("pm-collapsible")
    expect(root.className).toContain("custom-root")
  })

  it("merges custom className on trigger", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger className="custom-trigger">Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button")
    expect(trigger.className).toContain("pm-collapsible__trigger")
    expect(trigger.className).toContain("custom-trigger")
  })

  it("applies size classes", () => {
    render(
      <Collapsible size="lg">
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>,
    )

    const trigger = screen.getByRole("button")
    expect(trigger.className).toContain("pm-collapsible__trigger--lg")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Collapsible data-testid="my-collapsible">
        <CollapsibleTrigger data-testid="my-trigger">Toggle</CollapsibleTrigger>
        <CollapsibleContent data-testid="my-content">Content</CollapsibleContent>
      </Collapsible>,
    )

    expect(screen.getByTestId("my-collapsible")).toBeInTheDocument()
    expect(screen.getByTestId("my-trigger")).toBeInTheDocument()
    expect(screen.getByTestId("my-content")).toBeInTheDocument()
  })
})
