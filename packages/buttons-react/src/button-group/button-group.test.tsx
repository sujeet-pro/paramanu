import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { BtnGroup } from "./button-group.js"
import { Btn } from "../button/button.js"

afterEach(cleanup)

describe("BtnGroup", () => {
  it("renders with role=group", () => {
    render(
      <BtnGroup aria-label="Actions">
        <Btn>Save</Btn>
      </BtnGroup>,
    )
    expect(screen.getByRole("group", { name: "Actions" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <BtnGroup aria-label="Actions">
        <Btn>A</Btn>
      </BtnGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-btn-group")
    expect(group.className).toContain("pm-btn-group--horizontal")
  })

  it("applies vertical orientation", () => {
    render(
      <BtnGroup orientation="vertical" aria-label="Actions">
        <Btn>A</Btn>
      </BtnGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-btn-group--vertical")
  })

  it("applies attached modifier", () => {
    render(
      <BtnGroup attached aria-label="Actions">
        <Btn>A</Btn>
      </BtnGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-btn-group--attached")
  })

  it("renders children", () => {
    render(
      <BtnGroup aria-label="Actions">
        <Btn>Save</Btn>
        <Btn>Cancel</Btn>
      </BtnGroup>,
    )
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(
      <BtnGroup ref={(el) => (groupRef = el)} aria-label="Actions">
        <Btn>A</Btn>
      </BtnGroup>,
    )
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <BtnGroup className="custom-class" aria-label="Actions">
        <Btn>A</Btn>
      </BtnGroup>,
    )
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-btn-group")
    expect(group.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <BtnGroup data-testid="my-group" aria-label="Actions">
        <Btn>A</Btn>
      </BtnGroup>,
    )
    expect(screen.getByTestId("my-group")).toBeInTheDocument()
  })

  it("supports aria-label", () => {
    render(
      <BtnGroup aria-label="Text formatting">
        <Btn>Bold</Btn>
        <Btn>Italic</Btn>
      </BtnGroup>,
    )
    expect(screen.getByRole("group", { name: "Text formatting" })).toBeInTheDocument()
  })
})
