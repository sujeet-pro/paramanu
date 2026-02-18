import { describe, it, expect } from "vitest"
import {
  collapsibleClasses,
  collapsibleModuleClasses,
  collapsibleTriggerClasses,
  collapsibleTriggerModuleClasses,
  collapsibleContentClasses,
  collapsibleContentModuleClasses,
} from "./collapsible.classes.js"

describe("collapsibleClasses", () => {
  it("returns default classes (md)", () => {
    const result = collapsibleClasses()
    expect(result).toBe("pm-collapsible pm-collapsible--md")
  })

  it("applies size", () => {
    expect(collapsibleClasses({ size: "sm" })).toContain("pm-collapsible--sm")
    expect(collapsibleClasses({ size: "lg" })).toContain("pm-collapsible--lg")
  })

  it("applies open modifier", () => {
    expect(collapsibleClasses({ open: true })).toContain("pm-collapsible--open")
    expect(collapsibleClasses({ open: false })).not.toContain("pm-collapsible--open")
  })

  it("applies disabled modifier", () => {
    expect(collapsibleClasses({ disabled: true })).toContain("pm-collapsible--disabled")
    expect(collapsibleClasses({ disabled: false })).not.toContain("pm-collapsible--disabled")
  })

  it("always includes base class", () => {
    expect(collapsibleClasses()).toMatch(/^pm-collapsible\s/)
  })

  it("combines multiple options", () => {
    const result = collapsibleClasses({ open: true, disabled: true, size: "lg" })
    expect(result).toBe("pm-collapsible pm-collapsible--lg pm-collapsible--open pm-collapsible--disabled")
  })
})

describe("collapsibleModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-collapsible": "pm_abc_collapsible",
    "pm-collapsible--md": "pm_abc_md",
    "pm-collapsible--sm": "pm_abc_sm",
    "pm-collapsible--open": "pm_abc_open",
    "pm-collapsible--disabled": "pm_abc_disabled",
  }

  it("returns mapped default classes", () => {
    const result = collapsibleModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_collapsible pm_abc_md")
  })

  it("maps open class", () => {
    const result = collapsibleModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_open")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = { "pm-collapsible": "pm_abc_collapsible" }
    const result = collapsibleModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_collapsible")
    expect(result).not.toContain("undefined")
  })
})

describe("collapsibleTriggerClasses", () => {
  it("returns default classes", () => {
    const result = collapsibleTriggerClasses()
    expect(result).toBe("pm-collapsible__trigger pm-collapsible__trigger--md")
  })

  it("applies size", () => {
    expect(collapsibleTriggerClasses({ size: "sm" })).toContain("pm-collapsible__trigger--sm")
    expect(collapsibleTriggerClasses({ size: "lg" })).toContain("pm-collapsible__trigger--lg")
  })

  it("applies open modifier", () => {
    expect(collapsibleTriggerClasses({ open: true })).toContain("pm-collapsible__trigger--open")
  })

  it("applies disabled modifier", () => {
    expect(collapsibleTriggerClasses({ disabled: true })).toContain(
      "pm-collapsible__trigger--disabled",
    )
  })
})

describe("collapsibleTriggerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-collapsible__trigger": "pm_abc_trigger",
    "pm-collapsible__trigger--md": "pm_abc_trigger_md",
    "pm-collapsible__trigger--open": "pm_abc_trigger_open",
    "pm-collapsible__trigger--disabled": "pm_abc_trigger_disabled",
  }

  it("returns mapped default classes", () => {
    const result = collapsibleTriggerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_trigger pm_abc_trigger_md")
  })

  it("maps open class", () => {
    const result = collapsibleTriggerModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_trigger_open")
  })
})

describe("collapsibleContentClasses", () => {
  it("returns default classes", () => {
    const result = collapsibleContentClasses()
    expect(result).toBe("pm-collapsible__content pm-collapsible__content--md")
  })

  it("applies open modifier", () => {
    expect(collapsibleContentClasses({ open: true })).toContain("pm-collapsible__content--open")
  })

  it("applies size", () => {
    expect(collapsibleContentClasses({ size: "lg" })).toContain("pm-collapsible__content--lg")
  })
})

describe("collapsibleContentModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-collapsible__content": "pm_abc_content",
    "pm-collapsible__content--md": "pm_abc_content_md",
    "pm-collapsible__content--open": "pm_abc_content_open",
  }

  it("returns mapped default classes", () => {
    const result = collapsibleContentModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_content pm_abc_content_md")
  })

  it("maps open class", () => {
    const result = collapsibleContentModuleClasses(mockClassMap, { open: true })
    expect(result).toContain("pm_abc_content_open")
  })
})
