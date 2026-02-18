import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Steps, Step, StepIndicator, StepConnector, StepContent } from "./steps.js"

afterEach(cleanup)

describe("Steps", () => {
  it("renders with role=list and aria-label", () => {
    render(
      <Steps>
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
          <StepContent>Step 1</StepContent>
        </Step>
      </Steps>,
    )
    const root = screen.getByRole("list", { name: "Progress" })
    expect(root).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <Steps data-testid="steps">
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
        </Step>
      </Steps>,
    )
    const steps = screen.getByTestId("steps")
    expect(steps.className).toContain("pm-steps")
    expect(steps.className).toContain("pm-steps--md")
    expect(steps.className).toContain("pm-steps--horizontal")
  })

  it("applies size and orientation", () => {
    render(
      <Steps size="lg" orientation="vertical" data-testid="steps">
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
        </Step>
      </Steps>,
    )
    const steps = screen.getByTestId("steps")
    expect(steps.className).toContain("pm-steps--lg")
    expect(steps.className).toContain("pm-steps--vertical")
  })

  it("merges custom className", () => {
    render(
      <Steps className="custom" data-testid="steps">
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
        </Step>
      </Steps>,
    )
    const steps = screen.getByTestId("steps")
    expect(steps.className).toContain("pm-steps")
    expect(steps.className).toContain("custom")
  })

  it("forwards ref", () => {
    let stepsRef: HTMLDivElement | null = null
    render(
      <Steps ref={(el) => (stepsRef = el)}>
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
        </Step>
      </Steps>,
    )
    expect(stepsRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("Step", () => {
  it("applies step classes with status", () => {
    render(
      <Steps>
        <Step status="complete" data-testid="step">
          <StepIndicator status="complete">1</StepIndicator>
        </Step>
      </Steps>,
    )
    const step = screen.getByTestId("step")
    expect(step.className).toContain("pm-steps__step")
    expect(step.className).toContain("pm-steps__step--complete")
  })

  it("sets aria-current on active step", () => {
    render(
      <Steps>
        <Step status="active" data-testid="step">
          <StepIndicator status="active">1</StepIndicator>
        </Step>
      </Steps>,
    )
    const step = screen.getByTestId("step")
    expect(step).toHaveAttribute("aria-current", "step")
  })

  it("does not set aria-current on incomplete step", () => {
    render(
      <Steps>
        <Step status="incomplete" data-testid="step">
          <StepIndicator status="incomplete">1</StepIndicator>
        </Step>
      </Steps>,
    )
    const step = screen.getByTestId("step")
    expect(step.hasAttribute("aria-current")).toBe(false)
  })

  it("forwards ref", () => {
    let stepRef: HTMLDivElement | null = null
    render(
      <Steps>
        <Step ref={(el) => (stepRef = el)} status="active">
          <StepIndicator status="active">1</StepIndicator>
        </Step>
      </Steps>,
    )
    expect(stepRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("StepIndicator", () => {
  it("renders with aria-hidden", () => {
    render(
      <Steps>
        <Step status="active">
          <StepIndicator status="active" data-testid="indicator">
            1
          </StepIndicator>
        </Step>
      </Steps>,
    )
    const indicator = screen.getByTestId("indicator")
    expect(indicator).toHaveAttribute("aria-hidden", "true")
  })

  it("applies indicator classes with status", () => {
    render(
      <Steps>
        <Step status="active">
          <StepIndicator status="active" data-testid="indicator">
            1
          </StepIndicator>
        </Step>
      </Steps>,
    )
    const indicator = screen.getByTestId("indicator")
    expect(indicator.className).toContain("pm-steps__indicator")
    expect(indicator.className).toContain("pm-steps__indicator--active")
  })

  it("forwards ref", () => {
    let indicatorRef: HTMLDivElement | null = null
    render(
      <Steps>
        <Step status="active">
          <StepIndicator ref={(el) => (indicatorRef = el)} status="active">
            1
          </StepIndicator>
        </Step>
      </Steps>,
    )
    expect(indicatorRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("StepConnector", () => {
  it("renders with role=presentation", () => {
    render(
      <Steps>
        <Step status="complete">
          <StepIndicator status="complete">1</StepIndicator>
          <StepConnector status="complete" data-testid="connector" />
        </Step>
      </Steps>,
    )
    const connector = screen.getByTestId("connector")
    expect(connector).toHaveAttribute("role", "presentation")
  })

  it("applies connector classes with status", () => {
    render(
      <Steps>
        <Step status="complete">
          <StepIndicator status="complete">1</StepIndicator>
          <StepConnector status="complete" data-testid="connector" />
        </Step>
      </Steps>,
    )
    const connector = screen.getByTestId("connector")
    expect(connector.className).toContain("pm-steps__connector")
    expect(connector.className).toContain("pm-steps__connector--complete")
  })

  it("forwards ref", () => {
    let connectorRef: HTMLDivElement | null = null
    render(
      <Steps>
        <Step status="complete">
          <StepIndicator status="complete">1</StepIndicator>
          <StepConnector ref={(el) => (connectorRef = el)} status="complete" />
        </Step>
      </Steps>,
    )
    expect(connectorRef).toBeInstanceOf(HTMLDivElement)
  })
})

describe("StepContent", () => {
  it("renders children", () => {
    render(
      <Steps>
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
          <StepContent>Step Title</StepContent>
        </Step>
      </Steps>,
    )
    expect(screen.getByText("Step Title")).toBeInTheDocument()
  })

  it("applies content classes", () => {
    render(
      <Steps>
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
          <StepContent data-testid="content">Title</StepContent>
        </Step>
      </Steps>,
    )
    const content = screen.getByTestId("content")
    expect(content.className).toContain("pm-steps__content")
  })

  it("merges custom className", () => {
    render(
      <Steps>
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
          <StepContent className="custom" data-testid="content">
            Title
          </StepContent>
        </Step>
      </Steps>,
    )
    const content = screen.getByTestId("content")
    expect(content.className).toContain("pm-steps__content")
    expect(content.className).toContain("custom")
  })

  it("forwards ref", () => {
    let contentRef: HTMLDivElement | null = null
    render(
      <Steps>
        <Step status="active">
          <StepIndicator status="active">1</StepIndicator>
          <StepContent ref={(el) => (contentRef = el)}>Title</StepContent>
        </Step>
      </Steps>,
    )
    expect(contentRef).toBeInstanceOf(HTMLDivElement)
  })
})
