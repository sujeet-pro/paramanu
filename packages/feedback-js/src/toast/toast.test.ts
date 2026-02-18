import { describe, it, expect } from "vitest"
import {
  toastClasses,
  toastModuleClasses,
  toastContainerClasses,
  toastContainerModuleClasses,
} from "./toast.classes.js"

describe("toastClasses", () => {
  it("returns default classes (info variant)", () => {
    const result = toastClasses()
    expect(result.root).toBe("pm-toast pm-toast--info")
    expect(result.icon).toBe("pm-toast__icon")
    expect(result.content).toBe("pm-toast__content")
    expect(result.message).toBe("pm-toast__message")
    expect(result.close).toBe("pm-toast__close")
  })

  it("applies variant", () => {
    expect(toastClasses({ variant: "info" }).root).toContain("pm-toast--info")
    expect(toastClasses({ variant: "success" }).root).toContain("pm-toast--success")
    expect(toastClasses({ variant: "warning" }).root).toContain("pm-toast--warning")
    expect(toastClasses({ variant: "danger" }).root).toContain("pm-toast--danger")
  })

  it("applies dismissible modifier", () => {
    expect(toastClasses({ dismissible: true }).root).toContain("pm-toast--dismissible")
    expect(toastClasses({ dismissible: false }).root).not.toContain("pm-toast--dismissible")
  })

  it("applies entering modifier", () => {
    expect(toastClasses({ entering: true }).root).toContain("pm-toast--entering")
    expect(toastClasses({ entering: false }).root).not.toContain("pm-toast--entering")
  })

  it("applies exiting modifier", () => {
    expect(toastClasses({ exiting: true }).root).toContain("pm-toast--exiting")
    expect(toastClasses({ exiting: false }).root).not.toContain("pm-toast--exiting")
  })

  it("always includes base class in root", () => {
    expect(toastClasses().root).toMatch(/^pm-toast\s/)
  })

  it("combines multiple options", () => {
    const result = toastClasses({
      variant: "danger",
      dismissible: true,
      entering: true,
    })
    expect(result.root).toBe("pm-toast pm-toast--danger pm-toast--dismissible pm-toast--entering")
  })

  it("returns all sub-element classes", () => {
    const result = toastClasses()
    expect(result).toHaveProperty("root")
    expect(result).toHaveProperty("icon")
    expect(result).toHaveProperty("content")
    expect(result).toHaveProperty("message")
    expect(result).toHaveProperty("close")
  })
})

describe("toastContainerClasses", () => {
  it("returns default classes (top-right placement)", () => {
    expect(toastContainerClasses()).toBe("pm-toast-container pm-toast-container--top-right")
  })

  it("applies all placements", () => {
    expect(toastContainerClasses({ placement: "top-right" })).toContain(
      "pm-toast-container--top-right",
    )
    expect(toastContainerClasses({ placement: "top-left" })).toContain(
      "pm-toast-container--top-left",
    )
    expect(toastContainerClasses({ placement: "top-center" })).toContain(
      "pm-toast-container--top-center",
    )
    expect(toastContainerClasses({ placement: "bottom-right" })).toContain(
      "pm-toast-container--bottom-right",
    )
    expect(toastContainerClasses({ placement: "bottom-left" })).toContain(
      "pm-toast-container--bottom-left",
    )
    expect(toastContainerClasses({ placement: "bottom-center" })).toContain(
      "pm-toast-container--bottom-center",
    )
  })

  it("always includes base class", () => {
    expect(toastContainerClasses()).toMatch(/^pm-toast-container\s/)
  })
})

describe("toastModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toast": "pm_abc_toast",
    "pm-toast--info": "pm_abc_info",
    "pm-toast--success": "pm_abc_success",
    "pm-toast--warning": "pm_abc_warning",
    "pm-toast--danger": "pm_abc_danger",
    "pm-toast--dismissible": "pm_abc_dismissible",
    "pm-toast--entering": "pm_abc_entering",
    "pm-toast--exiting": "pm_abc_exiting",
    "pm-toast__icon": "pm_abc_icon",
    "pm-toast__content": "pm_abc_content",
    "pm-toast__message": "pm_abc_message",
    "pm-toast__close": "pm_abc_close",
  }

  it("returns mapped default classes", () => {
    const result = toastModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_toast pm_abc_info")
    expect(result.icon).toBe("pm_abc_icon")
    expect(result.content).toBe("pm_abc_content")
    expect(result.message).toBe("pm_abc_message")
    expect(result.close).toBe("pm_abc_close")
  })

  it("maps variant classes correctly", () => {
    const result = toastModuleClasses(mockClassMap, { variant: "danger" })
    expect(result.root).toContain("pm_abc_danger")
  })

  it("maps dismissible class", () => {
    const result = toastModuleClasses(mockClassMap, { dismissible: true })
    expect(result.root).toContain("pm_abc_dismissible")
  })

  it("maps entering class", () => {
    const result = toastModuleClasses(mockClassMap, { entering: true })
    expect(result.root).toContain("pm_abc_entering")
  })

  it("maps exiting class", () => {
    const result = toastModuleClasses(mockClassMap, { exiting: true })
    expect(result.root).toContain("pm_abc_exiting")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toast": "pm_abc_toast",
    }
    const result = toastModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_toast")
    expect(result.root).not.toContain("undefined")
    expect(result.icon).toBe("")
    expect(result.content).toBe("")
    expect(result.message).toBe("")
    expect(result.close).toBe("")
  })
})

describe("toastContainerModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-toast-container": "pm_abc_container",
    "pm-toast-container--top-right": "pm_abc_top_right",
    "pm-toast-container--top-left": "pm_abc_top_left",
    "pm-toast-container--top-center": "pm_abc_top_center",
    "pm-toast-container--bottom-right": "pm_abc_bottom_right",
    "pm-toast-container--bottom-left": "pm_abc_bottom_left",
    "pm-toast-container--bottom-center": "pm_abc_bottom_center",
  }

  it("returns mapped default classes", () => {
    const result = toastContainerModuleClasses(mockClassMap)
    expect(result).toBe("pm_abc_container pm_abc_top_right")
  })

  it("maps all placements correctly", () => {
    expect(toastContainerModuleClasses(mockClassMap, { placement: "top-left" })).toContain(
      "pm_abc_top_left",
    )
    expect(toastContainerModuleClasses(mockClassMap, { placement: "bottom-center" })).toContain(
      "pm_abc_bottom_center",
    )
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-toast-container": "pm_abc_container",
    }
    const result = toastContainerModuleClasses(sparseMap)
    expect(result).toContain("pm_abc_container")
    expect(result).not.toContain("undefined")
  })
})
