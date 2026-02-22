import { describe, it, expect } from "vitest"
import {
  accordionClasses,
  accordionModuleClasses,
  accordionItemClasses,
  accordionItemModuleClasses,
  accordionTriggerClasses,
  accordionTriggerModuleClasses,
  accordionContentClasses,
  accordionContentModuleClasses,
} from "./accordion.classes.js"

describe("accordionClasses", () => {
  it("returns default classes (default variant, md size)", () => {
    const result = accordionClasses()
    expect(result).toBe("pm-accordion pm-accordion--default pm-accordion--md")
  })

  it("applies variant", () => {
    expect(accordionClasses({ variant: "bordered" })).toContain("pm-accordion--bordered")
    expect(accordionClasses({ variant: "separated" })).toContain("pm-accordion--separated")
  })

  it("applies size", () => {
    expect(accordionClasses({ size: "sm" })).toContain("pm-accordion--sm")
    expect(accordionClasses({ size: "lg" })).toContain("pm-accordion--lg")
  })

  it("always includes base class", () => {
    expect(accordionClasses()).toMatch(/^pm-accordion\s/)
  })

  it("combines variant and size", () => {
    const result = accordionClasses({ variant: "bordered", size: "lg" })
    expect(result).toBe("pm-accordion pm-accordion--bordered pm-accordion--lg")
  })
})

describe("accordionModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-accordion": "pm_abc_accordion",
    "pm-accordion--default": "pm_abc_default",
    "pm-accordion--bordered": "pm_abc_bordered",
    "pm-accordion--md": "pm_abc_md",
    "pm-accordion--lg": "pm_abc_lg",
  }

  it("returns mapped default classes", () => {
    const result = accordionModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_accordion pm_abc_default pm_abc_md")
  })

  it("maps variant classes correctly", () => {
    const result = accordionModuleClasses(mockClassMap, { variant: "bordered" })
    expect(result).toContain("pm_abc_bordered")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-accordion": "pm_abc_accordion" }
    const result = accordionModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_accordion")
    expect(result).not.toContain("undefined")
  })
})

describe("accordionItemClasses", () => {
  it("returns default classes", () => {
    const result = accordionItemClasses()
    expect(result).toBe("pm-accordion__item pm-accordion__item--default")
  })

  it("applies variant", () => {
    expect(accordionItemClasses({ variant: "bordered" })).toContain("pm-accordion__item--bordered")
  })

  it("applies open modifier", () => {
    expect(accordionItemClasses({ open: true })).toContain("pm-accordion__item--open")
    expect(accordionItemClasses({ open: false })).not.toContain("pm-accordion__item--open")
  })

  it("applies disabled modifier", () => {
    expect(accordionItemClasses({ disabled: true })).toContain("pm-accordion__item--disabled")
  })

  it("combines multiple options", () => {
    const result = accordionItemClasses({ open: true, disabled: true, variant: "separated" })
    expect(result).toBe(
      "pm-accordion__item pm-accordion__item--separated pm-accordion__item--open pm-accordion__item--disabled",
    )
  })
})

describe("accordionItemModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-accordion__item": "pm_abc_item",
    "pm-accordion__item--default": "pm_abc_item_default",
    "pm-accordion__item--open": "pm_abc_item_open",
    "pm-accordion__item--disabled": "pm_abc_item_disabled",
  }

  it("returns mapped default classes", () => {
    const result = accordionItemModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_item pm_abc_item_default")
  })

  it("maps open class", () => {
    const result = accordionItemModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_item_open")
  })
})

describe("accordionTriggerClasses", () => {
  it("returns default classes", () => {
    const result = accordionTriggerClasses()
    expect(result).toBe("pm-accordion__trigger pm-accordion__trigger--md")
  })

  it("applies size", () => {
    expect(accordionTriggerClasses({ size: "sm" })).toContain("pm-accordion__trigger--sm")
    expect(accordionTriggerClasses({ size: "lg" })).toContain("pm-accordion__trigger--lg")
  })

  it("applies open modifier", () => {
    expect(accordionTriggerClasses({ open: true })).toContain("pm-accordion__trigger--open")
  })

  it("applies disabled modifier", () => {
    expect(accordionTriggerClasses({ disabled: true })).toContain("pm-accordion__trigger--disabled")
  })
})

describe("accordionTriggerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-accordion__trigger": "pm_abc_trigger",
    "pm-accordion__trigger--md": "pm_abc_trigger_md",
    "pm-accordion__trigger--open": "pm_abc_trigger_open",
    "pm-accordion__trigger--disabled": "pm_abc_trigger_disabled",
  }

  it("returns mapped default classes", () => {
    const result = accordionTriggerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_trigger pm_abc_trigger_md")
  })

  it("maps open class", () => {
    const result = accordionTriggerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_trigger_open")
  })
})

describe("accordionContentClasses", () => {
  it("returns default classes", () => {
    const result = accordionContentClasses()
    expect(result).toBe("pm-accordion__content pm-accordion__content--md")
  })

  it("applies open modifier", () => {
    expect(accordionContentClasses({ open: true })).toContain("pm-accordion__content--open")
  })

  it("applies size", () => {
    expect(accordionContentClasses({ size: "lg" })).toContain("pm-accordion__content--lg")
  })
})

describe("accordionContentModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-accordion__content": "pm_abc_content",
    "pm-accordion__content--md": "pm_abc_content_md",
    "pm-accordion__content--open": "pm_abc_content_open",
  }

  it("returns mapped default classes", () => {
    const result = accordionContentModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_content pm_abc_content_md")
  })

  it("maps open class", () => {
    const result = accordionContentModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_content_open")
  })
})
