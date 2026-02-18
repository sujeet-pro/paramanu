import { describe, it, expect, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"
import { Skeleton } from "./skeleton.js"

afterEach(cleanup)

describe("Skeleton", () => {
  it("renders with aria-hidden", () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton).toHaveAttribute("aria-hidden", "true")
  })

  it("applies default classes", () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton.className).toContain("pm-skeleton")
    expect(skeleton.className).toContain("pm-skeleton--text")
  })

  it("applies variant class", () => {
    const { container } = render(<Skeleton variant="circular" />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton.className).toContain("pm-skeleton--circular")
  })

  it("applies size class for circular variant", () => {
    const { container } = render(<Skeleton variant="circular" size="lg" />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton.className).toContain("pm-skeleton--lg")
  })

  it("supports custom width", () => {
    const { container } = render(<Skeleton width="200px" />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton.style.width).toBe("200px")
  })

  it("supports custom height", () => {
    const { container } = render(<Skeleton height={40} />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton.style.height).toBe("40px")
  })

  it("forwards ref", () => {
    let skeletonRef: HTMLDivElement | null = null
    render(<Skeleton ref={(el) => (skeletonRef = el)} />)
    expect(skeletonRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="custom-class" />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton.className).toContain("pm-skeleton")
    expect(skeleton.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    const { container } = render(<Skeleton data-testid="my-skeleton" />)
    const skeleton = container.firstElementChild as HTMLElement
    expect(skeleton).toHaveAttribute("data-testid", "my-skeleton")
  })
})
