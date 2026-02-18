import { describe, it, expect } from "vitest"
import {
  carouselClasses,
  carouselModuleClasses,
  carouselSlideClasses,
  carouselSlideModuleClasses,
  carouselControlClasses,
  carouselControlModuleClasses,
  carouselIndicatorClasses,
  carouselIndicatorModuleClasses,
} from "./carousel.classes.js"

describe("carouselClasses", () => {
  it("returns default classes (horizontal orientation, md size)", () => {
    const result = carouselClasses()
    expect(result).toBe("pm-carousel pm-carousel--horizontal pm-carousel--md")
  })

  it("applies orientation", () => {
    expect(carouselClasses({ orientation: "vertical" })).toContain("pm-carousel--vertical")
    expect(carouselClasses({ orientation: "horizontal" })).toContain("pm-carousel--horizontal")
  })

  it("applies size", () => {
    expect(carouselClasses({ size: "sm" })).toContain("pm-carousel--sm")
    expect(carouselClasses({ size: "lg" })).toContain("pm-carousel--lg")
  })

  it("always includes base class", () => {
    expect(carouselClasses()).toMatch(/^pm-carousel\s/)
  })

  it("combines orientation and size", () => {
    const result = carouselClasses({ orientation: "vertical", size: "lg" })
    expect(result).toBe("pm-carousel pm-carousel--vertical pm-carousel--lg")
  })
})

describe("carouselModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-carousel": "pm_abc_carousel",
    "pm-carousel--horizontal": "pm_abc_horizontal",
    "pm-carousel--vertical": "pm_abc_vertical",
    "pm-carousel--md": "pm_abc_md",
    "pm-carousel--lg": "pm_abc_lg",
  }

  it("returns mapped default classes", () => {
    const result = carouselModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_carousel pm_abc_horizontal pm_abc_md")
  })

  it("maps orientation classes correctly", () => {
    const result = carouselModuleClasses(mockClassMap, { orientation: "vertical" })
    expect(result).toContain("pm_abc_vertical")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-carousel": "pm_abc_carousel" }
    const result = carouselModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_carousel")
    expect(result).not.toContain("undefined")
  })
})

describe("carouselSlideClasses", () => {
  it("returns default classes", () => {
    const result = carouselSlideClasses()
    expect(result).toBe("pm-carousel__slide")
  })

  it("applies active modifier", () => {
    expect(carouselSlideClasses({ active: true })).toContain("pm-carousel__slide--active")
    expect(carouselSlideClasses({ active: false })).not.toContain("pm-carousel__slide--active")
  })
})

describe("carouselSlideModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-carousel__slide": "pm_abc_slide",
    "pm-carousel__slide--active": "pm_abc_slide_active",
  }

  it("returns mapped default classes", () => {
    const result = carouselSlideModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_slide")
  })

  it("maps active class", () => {
    const result = carouselSlideModuleClasses(mockClassMap, { active: true })
    expect(result).toContain("pm_abc_slide_active")
  })
})

describe("carouselControlClasses", () => {
  it("returns prev control classes", () => {
    const result = carouselControlClasses({ direction: "prev" })
    expect(result).toBe("pm-carousel__control pm-carousel__control--prev")
  })

  it("returns next control classes", () => {
    const result = carouselControlClasses({ direction: "next" })
    expect(result).toBe("pm-carousel__control pm-carousel__control--next")
  })

  it("applies disabled modifier", () => {
    expect(carouselControlClasses({ direction: "prev", disabled: true })).toContain(
      "pm-carousel__control--disabled",
    )
    expect(carouselControlClasses({ direction: "next", disabled: false })).not.toContain(
      "pm-carousel__control--disabled",
    )
  })

  it("combines direction and disabled", () => {
    const result = carouselControlClasses({ direction: "next", disabled: true })
    expect(result).toBe(
      "pm-carousel__control pm-carousel__control--next pm-carousel__control--disabled",
    )
  })
})

describe("carouselControlModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-carousel__control": "pm_abc_control",
    "pm-carousel__control--prev": "pm_abc_control_prev",
    "pm-carousel__control--next": "pm_abc_control_next",
    "pm-carousel__control--disabled": "pm_abc_control_disabled",
  }

  it("returns mapped prev classes", () => {
    const result = carouselControlModuleClasses(mockClassMap, { direction: "prev" })
    expect(result).toBe("pm_abc_control pm_abc_control_prev")
  })

  it("maps disabled class", () => {
    const result = carouselControlModuleClasses(mockClassMap, {
      direction: "next",
      disabled: true,
    })
    expect(result).toContain("pm_abc_control_disabled")
  })
})

describe("carouselIndicatorClasses", () => {
  it("returns default classes", () => {
    const result = carouselIndicatorClasses()
    expect(result).toBe("pm-carousel__indicator")
  })

  it("applies active modifier", () => {
    expect(carouselIndicatorClasses({ active: true })).toContain("pm-carousel__indicator--active")
    expect(carouselIndicatorClasses({ active: false })).not.toContain(
      "pm-carousel__indicator--active",
    )
  })
})

describe("carouselIndicatorModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-carousel__indicator": "pm_abc_indicator",
    "pm-carousel__indicator--active": "pm_abc_indicator_active",
  }

  it("returns mapped default classes", () => {
    const result = carouselIndicatorModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_indicator")
  })

  it("maps active class", () => {
    const result = carouselIndicatorModuleClasses(mockClassMap, { active: true })
    expect(result).toContain("pm_abc_indicator_active")
  })
})
