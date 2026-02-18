import { describe, it, expect } from "vitest"
import {
  cardClasses,
  cardMediaClasses,
  cardModuleClasses,
  cardMediaModuleClasses,
} from "./card.classes.js"

describe("cardClasses", () => {
  it("returns default classes (elevated, md)", () => {
    const result = cardClasses()
    expect(result.root).toBe("pm-card pm-card--elevated pm-card--md")
    expect(result.header).toBe("pm-card__header")
    expect(result.body).toBe("pm-card__body")
    expect(result.footer).toBe("pm-card__footer")
    expect(result.media).toBe("pm-card__media")
  })

  it("applies variant", () => {
    expect(cardClasses({ variant: "outline" }).root).toContain("pm-card--outline")
    expect(cardClasses({ variant: "filled" }).root).toContain("pm-card--filled")
    expect(cardClasses({ variant: "ghost" }).root).toContain("pm-card--ghost")
  })

  it("applies size", () => {
    expect(cardClasses({ size: "sm" }).root).toContain("pm-card--sm")
    expect(cardClasses({ size: "lg" }).root).toContain("pm-card--lg")
  })

  it("applies interactive modifier", () => {
    expect(cardClasses({ interactive: true }).root).toContain("pm-card--interactive")
    expect(cardClasses({ interactive: false }).root).not.toContain("pm-card--interactive")
  })

  it("applies full-width modifier", () => {
    expect(cardClasses({ fullWidth: true }).root).toContain("pm-card--full-width")
    expect(cardClasses({ fullWidth: false }).root).not.toContain("pm-card--full-width")
  })

  it("applies horizontal modifier", () => {
    expect(cardClasses({ horizontal: true }).root).toContain("pm-card--horizontal")
    expect(cardClasses({ horizontal: false }).root).not.toContain("pm-card--horizontal")
  })

  it("always includes base class in root", () => {
    expect(cardClasses().root).toMatch(/^pm-card\s/)
  })

  it("returns consistent sub-part classes", () => {
    const a = cardClasses({ size: "sm" })
    const b = cardClasses({ size: "lg" })
    expect(a.header).toBe(b.header)
    expect(a.body).toBe(b.body)
    expect(a.footer).toBe(b.footer)
    expect(a.media).toBe(b.media)
  })

  it("combines multiple options", () => {
    const result = cardClasses({
      variant: "outline",
      size: "lg",
      interactive: true,
      fullWidth: true,
      horizontal: true,
    })
    expect(result.root).toBe(
      "pm-card pm-card--outline pm-card--lg pm-card--interactive pm-card--full-width pm-card--horizontal",
    )
  })
})

describe("cardMediaClasses", () => {
  it("returns default position (top)", () => {
    expect(cardMediaClasses()).toBe("pm-card__media pm-card__media--top")
  })

  it("applies position", () => {
    expect(cardMediaClasses({ position: "bottom" })).toBe(
      "pm-card__media pm-card__media--bottom",
    )
    expect(cardMediaClasses({ position: "start" })).toBe(
      "pm-card__media pm-card__media--start",
    )
    expect(cardMediaClasses({ position: "end" })).toBe("pm-card__media pm-card__media--end")
  })
})

describe("cardModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-card": "pm_abc_card",
    "pm-card--elevated": "pm_abc_elevated",
    "pm-card--outline": "pm_abc_outline",
    "pm-card--md": "pm_abc_md",
    "pm-card--sm": "pm_abc_sm",
    "pm-card--interactive": "pm_abc_interactive",
    "pm-card--full-width": "pm_abc_fullWidth",
    "pm-card--horizontal": "pm_abc_horizontal",
    "pm-card__header": "pm_abc_header",
    "pm-card__body": "pm_abc_body",
    "pm-card__footer": "pm_abc_footer",
    "pm-card__media": "pm_abc_media",
  }

  it("returns mapped default classes", () => {
    const result = cardModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_card pm_abc_elevated pm_abc_md")
    expect(result.header).toBe("pm_abc_header")
    expect(result.body).toBe("pm_abc_body")
    expect(result.footer).toBe("pm_abc_footer")
    expect(result.media).toBe("pm_abc_media")
  })

  it("maps variant classes correctly", () => {
    const result = cardModuleClasses(mockClassMap, { variant: "outline" })
    expect(result.root).toContain("pm_abc_outline")
  })

  it("maps interactive class", () => {
    const result = cardModuleClasses(mockClassMap, { interactive: true })
    expect(result.root).toContain("pm_abc_interactive")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-card": "pm_abc_card",
    }
    const result = cardModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_card")
    expect(result.root).not.toContain("undefined")
    expect(result.header).toBe("")
    expect(result.body).toBe("")
    expect(result.footer).toBe("")
    expect(result.media).toBe("")
  })
})

describe("cardMediaModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-card__media": "pm_abc_media",
    "pm-card__media--top": "pm_abc_media_top",
    "pm-card__media--bottom": "pm_abc_media_bottom",
    "pm-card__media--start": "pm_abc_media_start",
    "pm-card__media--end": "pm_abc_media_end",
  }

  it("returns default position (top)", () => {
    expect(cardMediaModuleClasses(mockClassMap)).toBe("pm_abc_media pm_abc_media_top")
  })

  it("maps position classes correctly", () => {
    expect(cardMediaModuleClasses(mockClassMap, { position: "bottom" })).toContain(
      "pm_abc_media_bottom",
    )
    expect(cardMediaModuleClasses(mockClassMap, { position: "start" })).toContain(
      "pm_abc_media_start",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {}
    const result = cardMediaModuleClasses(sparseMap)
    expect(result).not.toContain("undefined")
  })
})
