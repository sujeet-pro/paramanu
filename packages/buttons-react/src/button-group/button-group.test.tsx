import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { ButtonGroup } from "./button-group.js"
import { Button } from "../button/button.js"

afterEach(cleanup)

describe("ButtonGroup", () => {
  it("renders with role=group", () => {
    render(
      <ButtonGroup aria-label="Actions">
        <Button>Save</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole("group", { name: "Actions" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <ButtonGroup aria-label="Actions">
        <Button>A</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-button-group")
    expect(group.className).toContain("pm-button-group--horizontal")
  })

  it("applies vertical orientation", () => {
    render(
      <ButtonGroup orientation="vertical" aria-label="Actions">
        <Button>A</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-button-group--vertical")
  })

  it("applies attached modifier", () => {
    render(
      <ButtonGroup attached aria-label="Actions">
        <Button>A</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-button-group--attached")
  })

  it("renders children", () => {
    render(
      <ButtonGroup aria-label="Actions">
        <Button>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(
      <ButtonGroup ref={(el) => (groupRef = el)} aria-label="Actions">
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <ButtonGroup className="custom-class" aria-label="Actions">
        <Button>A</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-button-group")
    expect(group.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <ButtonGroup data-testid="my-group" aria-label="Actions">
        <Button>A</Button>
      </ButtonGroup>,
    )
    expect(screen.getByTestId("my-group")).toBeInTheDocument()
  })

  it("supports aria-label", () => {
    render(
      <ButtonGroup aria-label="Text formatting">
        <Button>Bold</Button>
        <Button>Italic</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole("group", { name: "Text formatting" })).toBeInTheDocument()
  })
})
