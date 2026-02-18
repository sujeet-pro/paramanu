import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Group } from "./group.js"

afterEach(cleanup)

describe("Group", () => {
  it("renders with children", () => {
    render(<Group aria-label="Test group">Content</Group>)
    expect(screen.getByRole("group", { name: "Test group" })).toHaveTextContent("Content")
  })

  it("renders with role=group by default", () => {
    render(<Group aria-label="Actions">Buttons</Group>)
    expect(screen.getByRole("group", { name: "Actions" })).toBeInTheDocument()
  })

  it("renders horizontal by default", () => {
    render(
      <Group data-testid="group" aria-label="Group">
        Default
      </Group>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-group--horizontal")
  })

  it("renders vertical orientation", () => {
    render(
      <Group data-testid="group" orientation="vertical" aria-label="Group">
        Vertical
      </Group>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-group--vertical")
  })

  it("applies attached modifier", () => {
    render(
      <Group data-testid="group" attached aria-label="Group">
        Attached
      </Group>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-group--attached")
  })

  it("applies gap class", () => {
    render(
      <Group data-testid="group" gap="4" aria-label="Group">
        Gapped
      </Group>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-group--gap-4")
  })

  it("supports aria-label", () => {
    render(<Group aria-label="Action buttons">Buttons</Group>)
    const el = screen.getByRole("group", { name: "Action buttons" })
    expect(el).toHaveAttribute("aria-label", "Action buttons")
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(
      <Group ref={(el) => (groupRef = el)} aria-label="Group">
        Ref
      </Group>,
    )
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Group data-testid="group" className="custom-class" aria-label="Group">
        Custom
      </Group>,
    )
    const el = screen.getByTestId("group")
    expect(el.className).toContain("pm-group")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Group data-testid="my-group" aria-label="Group">
        Test
      </Group>,
    )
    expect(screen.getByTestId("my-group")).toBeInTheDocument()
  })
})
