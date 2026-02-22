import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion.js"

afterEach(cleanup)

function renderAccordion(props: Record<string, unknown> = {}) {
  return render(
    <Accordion {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" disabled>
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content 3</AccordionContent>
      </AccordionItem>
    </Accordion>,
  )
}

describe("Accordion", () => {
  it("renders all items with triggers and content", () => {
    renderAccordion()
    expect(screen.getByRole("button", { name: "Section 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Section 2" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Section 3" })).toBeInTheDocument()
    expect(screen.getAllByRole("region")).toHaveLength(3)
  })

  it("all items closed by default", () => {
    renderAccordion()
    const buttons = screen.getAllByRole("button")
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false")
    })
  })

  it("opens items from defaultValue", () => {
    renderAccordion({ defaultValue: ["item-1"] })
    expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
    expect(screen.getByRole("button", { name: "Section 2" })).toHaveAttribute(
      "aria-expanded",
      "false",
    )
  })

  it("toggles single item (single mode)", async () => {
    const user = userEvent.setup()
    renderAccordion()

    const trigger1 = screen.getByRole("button", { name: "Section 1" })
    const trigger2 = screen.getByRole("button", { name: "Section 2" })

    await user.click(trigger1)
    expect(trigger1).toHaveAttribute("aria-expanded", "true")

    // Clicking another closes the first
    await user.click(trigger2)
    expect(trigger1).toHaveAttribute("aria-expanded", "false")
    expect(trigger2).toHaveAttribute("aria-expanded", "true")

    // Clicking the same one closes it
    await user.click(trigger2)
    expect(trigger2).toHaveAttribute("aria-expanded", "false")
  })

  it("allows multiple items open (multiple mode)", async () => {
    const user = userEvent.setup()
    renderAccordion({ multiple: true })

    const trigger1 = screen.getByRole("button", { name: "Section 1" })
    const trigger2 = screen.getByRole("button", { name: "Section 2" })

    await user.click(trigger1)
    await user.click(trigger2)
    expect(trigger1).toHaveAttribute("aria-expanded", "true")
    expect(trigger2).toHaveAttribute("aria-expanded", "true")
  })

  it("supports controlled mode", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()

    const { rerender } = render(
      <Accordion value={[]} onValueChange={onValueChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole("button", { name: "Section 1" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    await user.click(trigger)
    expect(onValueChange).toHaveBeenCalledWith(["item-1"])

    rerender(
      <Accordion value={["item-1"]} onValueChange={onValueChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("disabled item does not toggle", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    renderAccordion({ onValueChange })

    const disabledTrigger = screen.getByRole("button", { name: "Section 3" })
    expect(disabledTrigger).toBeDisabled()
    await user.click(disabledTrigger)
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("trigger has aria-controls pointing to content", () => {
    renderAccordion()
    const trigger = screen.getByRole("button", { name: "Section 1" })
    const controlsId = trigger.getAttribute("aria-controls")
    const content = document.getElementById(controlsId!)
    expect(content).not.toBeNull()
    expect(content?.getAttribute("role")).toBe("region")
  })

  it("content has aria-labelledby pointing to trigger", () => {
    renderAccordion()
    const trigger = screen.getByRole("button", { name: "Section 1" })
    const controlsId = trigger.getAttribute("aria-controls")
    const content = document.getElementById(controlsId!)
    expect(content?.getAttribute("aria-labelledby")).toBe(trigger.id)
  })

  it("forwards ref on root", () => {
    let divRef: HTMLDivElement | null = null
    render(
      <Accordion ref={(el) => (divRef = el)}>
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref on item", () => {
    let divRef: HTMLDivElement | null = null
    render(
      <Accordion>
        <AccordionItem value="a" ref={(el) => (divRef = el)}>
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref on trigger", () => {
    let btnRef: HTMLButtonElement | null = null
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger ref={(el) => (btnRef = el)}>A</AccordionTrigger>
          <AccordionContent>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(btnRef).toBeInstanceOf(HTMLButtonElement)
  })

  it("forwards ref on content", () => {
    let divRef: HTMLDivElement | null = null
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent ref={(el) => (divRef = el)}>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Accordion className="custom-accordion">
        <AccordionItem value="a" className="custom-item">
          <AccordionTrigger className="custom-trigger">A</AccordionTrigger>
          <AccordionContent className="custom-content">A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole("button", { name: "A" })
    expect(trigger.className).toContain("pm-accordion__trigger")
    expect(trigger.className).toContain("custom-trigger")
  })

  it("applies variant classes", () => {
    const { container } = render(
      <Accordion variant="bordered">
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const root = container.firstChild as HTMLElement
    expect(root.className).toContain("pm-accordion--bordered")
  })

  it("applies size classes", () => {
    render(
      <Accordion size="lg">
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole("button", { name: "A" })
    expect(trigger.className).toContain("pm-accordion__trigger--lg")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Accordion data-testid="my-accordion">
        <AccordionItem value="a" data-testid="my-item">
          <AccordionTrigger data-testid="my-trigger">A</AccordionTrigger>
          <AccordionContent data-testid="my-content">A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    expect(screen.getByTestId("my-accordion")).toBeInTheDocument()
    expect(screen.getByTestId("my-item")).toBeInTheDocument()
    expect(screen.getByTestId("my-trigger")).toBeInTheDocument()
    expect(screen.getByTestId("my-content")).toBeInTheDocument()
  })
})
