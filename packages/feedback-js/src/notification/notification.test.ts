import { describe, it, expect } from "vitest"
import { notificationClasses, notificationModuleClasses } from "./notification.classes.js"

describe("notificationClasses", () => {
  it("returns default classes (no modifiers)", () => {
    const result = notificationClasses()
    expect(result.root).toBe("pm-notification")
    expect(result.icon).toBe("pm-notification__icon")
    expect(result.content).toBe("pm-notification__content")
    expect(result.title).toBe("pm-notification__title")
    expect(result.message).toBe("pm-notification__message")
    expect(result.timestamp).toBe("pm-notification__timestamp")
    expect(result.actions).toBe("pm-notification__actions")
    expect(result.close).toBe("pm-notification__close")
  })

  it("applies unread modifier", () => {
    const result = notificationClasses({ unread: true })
    expect(result.root).toContain("pm-notification--unread")
  })

  it("does not apply unread modifier when false", () => {
    const result = notificationClasses({ unread: false })
    expect(result.root).not.toContain("pm-notification--unread")
  })

  it("applies dismissible modifier", () => {
    const result = notificationClasses({ dismissible: true })
    expect(result.root).toContain("pm-notification--dismissible")
  })

  it("does not apply dismissible modifier when false", () => {
    const result = notificationClasses({ dismissible: false })
    expect(result.root).not.toContain("pm-notification--dismissible")
  })

  it("combines multiple modifiers", () => {
    const result = notificationClasses({ unread: true, dismissible: true })
    expect(result.root).toBe("pm-notification pm-notification--unread pm-notification--dismissible")
  })

  it("always includes base class in root", () => {
    expect(notificationClasses().root).toMatch(/^pm-notification/)
    expect(notificationClasses({ unread: true }).root).toMatch(/^pm-notification\s/)
  })

  it("returns all sub-element classes", () => {
    const result = notificationClasses()
    expect(result).toHaveProperty("root")
    expect(result).toHaveProperty("icon")
    expect(result).toHaveProperty("content")
    expect(result).toHaveProperty("title")
    expect(result).toHaveProperty("message")
    expect(result).toHaveProperty("timestamp")
    expect(result).toHaveProperty("actions")
    expect(result).toHaveProperty("close")
  })
})

describe("notificationModuleClasses", () => {
  const mockClassMap: Record<string, string> = {
    "pm-notification": "pm_abc_notification",
    "pm-notification--unread": "pm_abc_unread",
    "pm-notification--dismissible": "pm_abc_dismissible",
    "pm-notification__icon": "pm_abc_icon",
    "pm-notification__content": "pm_abc_content",
    "pm-notification__title": "pm_abc_title",
    "pm-notification__message": "pm_abc_message",
    "pm-notification__timestamp": "pm_abc_timestamp",
    "pm-notification__actions": "pm_abc_actions",
    "pm-notification__close": "pm_abc_close",
  }

  it("returns mapped default classes", () => {
    const result = notificationModuleClasses(mockClassMap)
    expect(result.root).toBe("pm_abc_notification")
    expect(result.icon).toBe("pm_abc_icon")
    expect(result.content).toBe("pm_abc_content")
    expect(result.title).toBe("pm_abc_title")
    expect(result.message).toBe("pm_abc_message")
    expect(result.timestamp).toBe("pm_abc_timestamp")
    expect(result.actions).toBe("pm_abc_actions")
    expect(result.close).toBe("pm_abc_close")
  })

  it("maps unread class", () => {
    const result = notificationModuleClasses(mockClassMap, { unread: true })
    expect(result.root).toContain("pm_abc_unread")
  })

  it("maps dismissible class", () => {
    const result = notificationModuleClasses(mockClassMap, { dismissible: true })
    expect(result.root).toContain("pm_abc_dismissible")
  })

  it("combines multiple mapped modifiers", () => {
    const result = notificationModuleClasses(mockClassMap, { unread: true, dismissible: true })
    expect(result.root).toBe("pm_abc_notification pm_abc_unread pm_abc_dismissible")
  })

  it("handles missing class map entries gracefully", () => {
    const sparseMap: Record<string, string> = {
      "pm-notification": "pm_abc_notification",
    }
    const result = notificationModuleClasses(sparseMap)
    expect(result.root).toContain("pm_abc_notification")
    expect(result.root).not.toContain("undefined")
    expect(result.icon).toBe("")
    expect(result.content).toBe("")
    expect(result.title).toBe("")
    expect(result.message).toBe("")
    expect(result.timestamp).toBe("")
    expect(result.actions).toBe("")
    expect(result.close).toBe("")
  })
})
